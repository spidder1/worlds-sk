#!/usr/bin/env node
import pg from 'pg';
import { EDSystemClient } from '@worlds/ed-client';

const { Pool } = pg;

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function text(value) {
  return String(value ?? '').trim();
}

function numberOrNull(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function flattenIndexTree(nodes, treeKey, parentIndexCode = null, output = []) {
  for (const node of nodes || []) {
    const indexCode = text(node.IndexCode);
    if (!indexCode) continue;
    output.push({
      treeKey,
      indexCode,
      commodityCode: text(node.CommodityCode) || null,
      parentIndexCode,
      indexName: text(node.IndexName),
      indexSort: text(node.IndexSort) || null,
      indexSortCode: text(node.IndexSortCode) || null,
      indexLevel: numberOrNull(node.IndexLevel),
      indexOrder: numberOrNull(node.IndexOrder),
      codeName: text(node.IndexCodeName) || null,
      payload: node,
    });
    const children = Array.isArray(node.ProductIndexList)
      ? node.ProductIndexList
      : node.ProductIndexList
        ? [node.ProductIndexList]
        : [];
    flattenIndexTree(children, treeKey, indexCode, output);
  }
  return output;
}

async function main() {
  const pool = new Pool({ connectionString: required('DATABASE_URL'), ssl: { rejectUnauthorized: false }, max: 4 });
  const client = new EDSystemClient({
    login: required('ED_LOGIN'),
    password: required('ED_PASSWORD'),
    endpointUrl: process.env.ED_ENDPOINT_URL?.trim(),
  });
  const [index1, index2, relations, informationCodes, producers, commodities, categoryAttributes, attributeValues] = await Promise.all([
    client.getProductIndexTree1(),
    client.getProductIndexTree2(),
    client.getProductRelationList(),
    client.getProductInformationList(),
    client.getProductProducerList(),
    client.getProductCommodityList(),
    client.getProductCategoryAttributeList(),
    client.getProductCategoryAttributeValueList(),
  ]);
  const indexRows = [
    ...flattenIndexTree(index1, 'INDEX_1'),
    ...flattenIndexTree(index2, 'INDEX_2'),
  ];
  if (indexRows.length === 0) throw new Error('eD returned no index-tree nodes; refusing to clear the current reference trees.');

  const db = await pool.connect();
  try {
    await db.query('BEGIN');

    for (const treeKey of ['INDEX_1', 'INDEX_2']) {
      await db.query('DELETE FROM supplier_index_nodes WHERE tree_key = $1', [treeKey]);
    }
    for (const row of indexRows) {
      await db.query(
        `INSERT INTO supplier_index_nodes
          (tree_key, index_code, commodity_code, parent_index_code, index_name, index_sort, index_sort_code,
           index_level, index_order, code_name, source_payload, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,NOW())`,
        [row.treeKey, row.indexCode, row.commodityCode, row.parentIndexCode, row.indexName, row.indexSort,
          row.indexSortCode, row.indexLevel, row.indexOrder, row.codeName, JSON.stringify(row.payload)],
      );
      const taxonomyCode = row.treeKey === 'INDEX_1' ? 'ED_INDEX_1' : 'ED_INDEX_2';
      const nodeId = `${taxonomyCode.toLowerCase()}:${row.indexCode}`;
      const parentNodeId = row.parentIndexCode ? `${taxonomyCode.toLowerCase()}:${row.parentIndexCode}` : null;
      await db.query(
        `INSERT INTO taxonomy_nodes
          (id, taxonomy_code, external_code, name, parent_node_id, display_order, source_payload, updated_at)
         VALUES ($1,$2,$3,$4,$5,COALESCE($6,0),$7::jsonb,NOW())
         ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, parent_node_id = EXCLUDED.parent_node_id,
           display_order = EXCLUDED.display_order, source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
        [nodeId, taxonomyCode, row.indexCode, row.indexName, parentNodeId, row.indexOrder, JSON.stringify(row.payload)],
      );
    }
    if (informationCodes.length > 0) {
      for (const item of informationCodes) {
        await db.query(
          `INSERT INTO supplier_information_codes (info_code, info_name, source_payload, updated_at)
           VALUES ($1,$2,$3::jsonb,NOW())
           ON CONFLICT (info_code) DO UPDATE SET info_name = EXCLUDED.info_name,
             source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
          [item.InfoCode, item.InfoName, JSON.stringify(item)],
        );
      }
    }
    if (producers.length > 0) {
      await db.query('DELETE FROM supplier_producers');
      for (const item of producers) {
        await db.query(
          `INSERT INTO supplier_producers (producer_code, producer_name, producer_id, source_payload, updated_at)
           VALUES ($1,$2,$3,$4::jsonb,NOW())`,
          [String(item.ProducerCode), String(item.ProducerName || ''), item.ProducerId == null ? null : String(item.ProducerId), JSON.stringify(item)],
        );
      }
    }
    if (commodities.length > 0) {
      await db.query('DELETE FROM supplier_commodities');
      for (const item of commodities) {
        await db.query(
          `INSERT INTO supplier_commodities (commodity_code, commodity_name, parent_commodity_code, source_payload, updated_at)
           VALUES ($1,$2,$3,$4::jsonb,NOW())`,
          [String(item.CommodityCode), String(item.CommodityName || ''), item.CommodityParentCode ? String(item.CommodityParentCode) : null, JSON.stringify(item)],
        );
        const commodityCode = text(item.CommodityCode);
        if (commodityCode) {
          const parentCode = text(item.CommodityParentCode);
          await db.query(
            `INSERT INTO taxonomy_nodes
              (id, taxonomy_code, external_code, name, parent_node_id, source_payload, updated_at)
             VALUES ($1,'ED_COMMODITY',$2,$3,$4,$5::jsonb,NOW())
             ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, parent_node_id = EXCLUDED.parent_node_id,
               source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
            [`ed_commodity:${commodityCode}`, commodityCode, text(item.CommodityName), parentCode ? `ed_commodity:${parentCode}` : null, JSON.stringify(item)],
          );
        }
      }
    }
    if (categoryAttributes.length > 0) {
      await db.query('DELETE FROM supplier_attributes');
      for (const item of categoryAttributes) {
        const attributeCode = text(item.AttributeCode);
        if (!attributeCode) continue;
        await db.query(
          `INSERT INTO supplier_attributes (attribute_code, attribute_name, is_primary, filter_operator, source_payload, updated_at)
           VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
           ON CONFLICT (attribute_code) DO UPDATE SET attribute_name = EXCLUDED.attribute_name,
             is_primary = EXCLUDED.is_primary, filter_operator = EXCLUDED.filter_operator,
             source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
          [attributeCode, text(item.AttributeName), String(item.IsPrimary).toLowerCase() === 'true', item.FilterOperator ? text(item.FilterOperator) : null, JSON.stringify(item)],
        );
      }
    }
    if (attributeValues.length > 0) {
      await db.query('DELETE FROM supplier_attribute_values');
      for (const item of attributeValues) {
        const attributeCode = text(item.AttributeCode);
        const valueCode = text(item.ValueCode);
        if (!attributeCode || !valueCode) continue;
        await db.query(
          `INSERT INTO supplier_attribute_values (attribute_code, value_code, value_text, value_sort, source_payload, updated_at)
           VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
           ON CONFLICT (attribute_code, value_code) DO UPDATE SET value_text = EXCLUDED.value_text,
             value_sort = EXCLUDED.value_sort, source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
          [attributeCode, valueCode, text(item.Value), numberOrNull(item.ValueSort), JSON.stringify(item)],
        );
      }
    }

    for (const taxonomyCode of ['ED_INDEX_1', 'ED_INDEX_2', 'ED_COMMODITY']) {
      await db.query('DELETE FROM taxonomy_node_closure WHERE taxonomy_code = $1', [taxonomyCode]);
      await db.query(
        `WITH RECURSIVE paths AS (
           SELECT n.id AS ancestor_node_id, n.id AS descendant_node_id, 0 AS depth, ARRAY[n.id]::text[] AS visited
             FROM taxonomy_nodes n WHERE n.taxonomy_code = $1
           UNION ALL
           SELECT p.ancestor_node_id, child.id, p.depth + 1, p.visited || child.id
             FROM paths p JOIN taxonomy_nodes child
               ON child.taxonomy_code = $1 AND child.parent_node_id = p.descendant_node_id
            WHERE NOT child.id = ANY(p.visited)
         )
         INSERT INTO taxonomy_node_closure (taxonomy_code, ancestor_node_id, descendant_node_id, depth)
         SELECT $1, ancestor_node_id, descendant_node_id, depth FROM paths
         ON CONFLICT DO NOTHING`,
        [taxonomyCode],
      );
    }

    const batch = await db.query(
      `INSERT INTO sync_batches (batch_number, mode, status, source_method, started_at)
       VALUES ($1, 'reference', 'RUNNING', 'getProductCategoryAttributeList/getProductCategoryAttributeValueList/getProductProducerList/getProductCommodityList/getProductInformationList/getProductRelationList/getProductIndexTree1/getProductIndexTree2', NOW())
       RETURNING id`,
      [`reference-${new Date().toISOString()}`],
    );
    const batchId = batch.rows[0]?.id ?? null;

    let resolved = 0;
    let unresolved = 0;
    if (relations.length > 0) {
      await db.query('DELETE FROM product_relations');
      for (const relation of relations) {
        for (const child of relation.Childs || []) {
          const parentCode = text(relation.ParentCode);
          const childCode = text(child.Code);
          const parentProId = text(relation.ParentProId);
          const childProId = text(child.ProId);
          const found = await db.query(
            `SELECT parent.id AS parent_id, child.id AS child_id
               FROM products parent, products child
              WHERE (parent.supplier_code = $1 OR parent.supplier_pro_id = $2)
                AND (child.supplier_code = $3 OR child.supplier_pro_id = $4)
              LIMIT 1`,
            [parentCode, parentProId, childCode, childProId],
          );
          const relationTypeId = text(child.RelTypeId) || 'UNKNOWN';
          const relationName = text(child.RelTypeName);
          await db.query(
            `INSERT INTO product_relation_types (relation_type_id, relation_name, updated_at)
             VALUES ($1,$2,NOW())
             ON CONFLICT (relation_type_id) DO UPDATE SET relation_name = EXCLUDED.relation_name, updated_at = NOW()`,
            [relationTypeId, relationName],
          );
          if (found.rows[0]) {
            await db.query(
              `INSERT INTO product_relations
                (parent_product_id, child_product_id, relation_type_id, parent_supplier_code, child_supplier_code,
                 quantity, relation_name, source_batch, source_payload, updated_at)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,NOW())
               ON CONFLICT (parent_product_id, child_product_id, relation_type_id) DO UPDATE SET
                 quantity = EXCLUDED.quantity, relation_name = EXCLUDED.relation_name,
                 source_batch = EXCLUDED.source_batch, source_payload = EXCLUDED.source_payload, updated_at = NOW()`,
              [found.rows[0].parent_id, found.rows[0].child_id, relationTypeId, parentCode, childCode,
                Number.isFinite(Number(child.Qty)) ? Number(child.Qty) : 1, relationName, batchId, JSON.stringify({ relation, child })],
            );
            resolved += 1;
          } else {
            await db.query(
              `INSERT INTO unresolved_product_relations
                (parent_pro_id, parent_code, child_pro_id, child_code, relation_type_id, relation_name,
                 quantity, source_batch, source_payload, last_seen_at)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,NOW())`,
              [parentProId || null, parentCode || null, childProId || null, childCode || null,
                relationTypeId, relationName, Number.isFinite(Number(child.Qty)) ? Number(child.Qty) : 1,
                batchId, JSON.stringify({ relation, child })],
            );
            unresolved += 1;
          }
        }
      }
    }
    await db.query(
      `UPDATE sync_batches SET status = 'COMPLETED', completed_at = NOW(), total_read = $1,
         imported_count = $2, filtered_count = $3, metrics = $4::jsonb WHERE id = $5`,
      [relations.length, resolved, unresolved, JSON.stringify({ indexNodes: indexRows.length, informationCodes: informationCodes.length, producers: producers.length, commodities: commodities.length, categoryAttributes: categoryAttributes.length, attributeValues: attributeValues.length, relations: relations.length, resolved, unresolved }), batchId],
    );
    await db.query('COMMIT');
    console.log(JSON.stringify({ indexNodes: indexRows.length, informationCodes: informationCodes.length, producers: producers.length, commodities: commodities.length, categoryAttributes: categoryAttributes.length, attributeValues: attributeValues.length, relationGroups: relations.length, resolved, unresolved }));
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  } finally {
    db.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

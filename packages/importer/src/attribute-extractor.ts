/**
 * Dynamic Attribute & Technical Parameter Extractor based on PRIVATEdoc.pdf specifications
 */

export interface ExtractedSpecs {
  screenSize?: { value: string; numeric: number };
  ramCapacity?: { value: string; numeric: number };
  ssdCapacity?: { value: string; numeric: number };
  cpuFamily?: string;
  gpuChip?: string;
  resolution?: string;
  refreshRate?: { value: string; numeric: number };
  os?: string;
  weightKg?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  allAttributes: Record<string, { code: string; name: string; value: string; rawValue: string; unit?: string; numericValue?: number }>;
  attributeRows: Array<{ attribute_code: string; value_code: string; value: string; numeric_value?: number }>;
}

export function extractStructuredAttributes(
  title: string,
  rawDescription: string,
  specsFromTable: Record<string, string>,
  brand: string,
  mpn: string,
  warrantyMonths: number
): ExtractedSpecs {
  const t = title.toLowerCase();
  const desc = rawDescription.toLowerCase();
  const fullText = `${t} ${desc}`;

  const allAttributes: ExtractedSpecs['allAttributes'] = {
    brand: { code: 'brand', name: 'Výrobca', value: brand, rawValue: brand },
    mpn: { code: 'mpn', name: 'Part Number', value: mpn, rawValue: mpn },
    warranty: { code: 'warranty', name: 'Záruka', value: `${warrantyMonths} mesiacov`, rawValue: String(warrantyMonths), unit: 'mesiacov', numericValue: warrantyMonths }
  };

  const attributeRows: ExtractedSpecs['attributeRows'] = [
    { attribute_code: 'brand', value_code: brand.toLowerCase().replace(/[^a-z0-9]+/g, '_'), value: brand },
    { attribute_code: 'warranty', value_code: `${warrantyMonths}m`, value: `${warrantyMonths} mesiacov`, numeric_value: warrantyMonths }
  ];

  let screenSize: ExtractedSpecs['screenSize'];
  let ramCapacity: ExtractedSpecs['ramCapacity'];
  let ssdCapacity: ExtractedSpecs['ssdCapacity'];
  let cpuFamily: string | undefined;
  let gpuChip: string | undefined;
  let resolution: string | undefined;
  let refreshRate: ExtractedSpecs['refreshRate'];
  let os: string | undefined;
  let weightKg: number | undefined;

  // 1. Uhlopriečka displeja (Screen Size)
  const screenMatch = fullText.match(/(\d{2}[.,]\d)["'”]/) || fullText.match(/(\d{2})["'”]/) || fullText.match(/(\d{2}[.,]\d)\s*(palc|inch)/);
  if (screenMatch) {
    const num = parseFloat(screenMatch[1].replace(',', '.'));
    if (num >= 10 && num <= 49) {
      screenSize = { value: `${num}"`, numeric: num };
      allAttributes['screen_size'] = { code: 'screen_size', name: 'Uhlopriečka displeja', value: `${num}"`, rawValue: String(num), unit: '"', numericValue: num };
      attributeRows.push({ attribute_code: 'screen_size', value_code: `${num}in`, value: `${num}"`, numeric_value: num });
    }
  }

  // 2. Kapacita RAM
  const ramMatch = fullText.match(/(\d{1,3})\s*(gb|g)\s*(ddr\d|ram|lpddr\d|pamäť|pamet)/i) || fullText.match(/ram\s*(\d{1,3})\s*(gb|g)/i) || fullText.match(/(\d{1,3})gb/i);
  if (ramMatch) {
    const num = parseInt(ramMatch[1], 10);
    if ([4, 8, 16, 24, 32, 48, 64, 96, 128].includes(num)) {
      ramCapacity = { value: `${num} GB`, numeric: num };
      allAttributes['ram_capacity'] = { code: 'ram_capacity', name: 'Kapacita RAM', value: `${num} GB`, rawValue: String(num), unit: 'GB', numericValue: num };
      attributeRows.push({ attribute_code: 'ram_capacity', value_code: `${num}gb`, value: `${num} GB`, numeric_value: num });
    }
  }

  // 3. Kapacita úložiska (SSD / HDD)
  if (fullText.includes('2tb') || fullText.includes('2 tb') || fullText.includes('2000gb')) {
    ssdCapacity = { value: '2 TB (2048 GB)', numeric: 2048 };
    allAttributes['ssd_capacity'] = { code: 'ssd_capacity', name: 'Kapacita SSD', value: '2 TB', rawValue: '2048', unit: 'GB', numericValue: 2048 };
    attributeRows.push({ attribute_code: 'ssd_capacity', value_code: '2tb', value: '2 TB', numeric_value: 2048 });
  } else if (fullText.includes('1tb') || fullText.includes('1 tb') || fullText.includes('1000gb') || fullText.includes('1024gb')) {
    ssdCapacity = { value: '1 TB (1024 GB)', numeric: 1024 };
    allAttributes['ssd_capacity'] = { code: 'ssd_capacity', name: 'Kapacita SSD', value: '1 TB', rawValue: '1024', unit: 'GB', numericValue: 1024 };
    attributeRows.push({ attribute_code: 'ssd_capacity', value_code: '1tb', value: '1 TB', numeric_value: 1024 });
  } else if (fullText.includes('512gb') || fullText.includes('512 gb')) {
    ssdCapacity = { value: '512 GB', numeric: 512 };
    allAttributes['ssd_capacity'] = { code: 'ssd_capacity', name: 'Kapacita SSD', value: '512 GB', rawValue: '512', unit: 'GB', numericValue: 512 };
    attributeRows.push({ attribute_code: 'ssd_capacity', value_code: '512gb', value: '512 GB', numeric_value: 512 });
  } else if (fullText.includes('256gb') || fullText.includes('256 gb')) {
    ssdCapacity = { value: '256 GB', numeric: 256 };
    allAttributes['ssd_capacity'] = { code: 'ssd_capacity', name: 'Kapacita SSD', value: '256 GB', rawValue: '256', unit: 'GB', numericValue: 256 };
    attributeRows.push({ attribute_code: 'ssd_capacity', value_code: '256gb', value: '256 GB', numeric_value: 256 });
  }

  // 4. Modelový rad procesora (CPU)
  if (fullText.includes('core ultra 9')) cpuFamily = 'Intel Core Ultra 9';
  else if (fullText.includes('core ultra 7')) cpuFamily = 'Intel Core Ultra 7';
  else if (fullText.includes('core ultra 5')) cpuFamily = 'Intel Core Ultra 5';
  else if (fullText.includes('core i9') || fullText.includes('i9-')) cpuFamily = 'Intel Core i9';
  else if (fullText.includes('core i7') || fullText.includes('i7-')) cpuFamily = 'Intel Core i7';
  else if (fullText.includes('core i5') || fullText.includes('i5-')) cpuFamily = 'Intel Core i5';
  else if (fullText.includes('core i3') || fullText.includes('i3-')) cpuFamily = 'Intel Core i3';
  else if (fullText.includes('ryzen 9') || fullText.includes('r9-')) cpuFamily = 'AMD Ryzen 9';
  else if (fullText.includes('ryzen 7') || fullText.includes('r7-')) cpuFamily = 'AMD Ryzen 7';
  else if (fullText.includes('ryzen 5') || fullText.includes('r5-')) cpuFamily = 'AMD Ryzen 5';
  else if (fullText.includes('ryzen 3') || fullText.includes('r3-')) cpuFamily = 'AMD Ryzen 3';
  else if (fullText.includes('apple m3')) cpuFamily = 'Apple M3';
  else if (fullText.includes('apple m2')) cpuFamily = 'Apple M2';
  else if (fullText.includes('apple m1')) cpuFamily = 'Apple M1';

  if (cpuFamily) {
    allAttributes['cpu_family'] = { code: 'cpu_family', name: 'Procesor', value: cpuFamily, rawValue: cpuFamily };
    attributeRows.push({ attribute_code: 'cpu_family', value_code: cpuFamily.toLowerCase().replace(/[^a-z0-9]+/g, '_'), value: cpuFamily });
  }

  // 5. Grafická karta (GPU)
  if (fullText.includes('rtx 4090')) gpuChip = 'NVIDIA GeForce RTX 4090';
  else if (fullText.includes('rtx 4080')) gpuChip = 'NVIDIA GeForce RTX 4080';
  else if (fullText.includes('rtx 4070')) gpuChip = 'NVIDIA GeForce RTX 4070';
  else if (fullText.includes('rtx 4060')) gpuChip = 'NVIDIA GeForce RTX 4060';
  else if (fullText.includes('rtx 4050')) gpuChip = 'NVIDIA GeForce RTX 4050';
  else if (fullText.includes('rtx 3050')) gpuChip = 'NVIDIA GeForce RTX 3050';
  else if (fullText.includes('radeon rx')) gpuChip = 'AMD Radeon RX';
  else if (fullText.includes('intel iris') || fullText.includes('iris xe')) gpuChip = 'Intel Iris Xe Graphics';
  else if (fullText.includes('intel arc')) gpuChip = 'Intel Arc Graphics';

  if (gpuChip) {
    allAttributes['gpu_chip'] = { code: 'gpu_chip', name: 'Grafická karta', value: gpuChip, rawValue: gpuChip };
    attributeRows.push({ attribute_code: 'gpu_chip', value_code: gpuChip.toLowerCase().replace(/[^a-z0-9]+/g, '_'), value: gpuChip });
  }

  // 6. Operačný systém
  if (fullText.includes('windows 11 pro') || fullText.includes('win 11 pro') || fullText.includes('w11p')) os = 'Windows 11 Pro';
  else if (fullText.includes('windows 11 home') || fullText.includes('win 11 home') || fullText.includes('w11h')) os = 'Windows 11 Home';
  else if (fullText.includes('windows 10 pro')) os = 'Windows 10 Pro';
  else if (fullText.includes('bez os') || fullText.includes('no os') || fullText.includes('freedos')) os = 'Bez OS (FreeDOS)';
  else if (fullText.includes('macos')) os = 'macOS';

  if (os) {
    allAttributes['os'] = { code: 'os', name: 'Operačný systém', value: os, rawValue: os };
    attributeRows.push({ attribute_code: 'os', value_code: os.toLowerCase().replace(/[^a-z0-9]+/g, '_'), value: os });
  }

  // 7. Doplnenie parametrov z tabuliek
  for (const [sKey, sVal] of Object.entries(specsFromTable)) {
    const cleanKey = sKey.toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 30);
    if (!allAttributes[cleanKey] && sVal.length < 80) {
      allAttributes[cleanKey] = { code: cleanKey, name: sKey, value: sVal, rawValue: sVal };
    }
  }

  return {
    screenSize,
    ramCapacity,
    ssdCapacity,
    cpuFamily,
    gpuChip,
    resolution,
    refreshRate,
    os,
    weightKg,
    allAttributes,
    attributeRows
  };
}

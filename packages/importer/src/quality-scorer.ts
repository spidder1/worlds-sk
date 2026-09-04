import { MasterProduct, QualityScore, calculateQualityScore } from '@worlds/types';

export class QualityScorer {
  /**
   * Calculates the Product Quality Score (0-100) based on Worlds.sk evaluation criteria.
   * The rules live in @worlds/types so the storefront scores identically.
   */
  calculateScore(product: Partial<MasterProduct>): QualityScore {
    return calculateQualityScore(product);
  }
}

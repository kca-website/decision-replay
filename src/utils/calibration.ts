import type { TFunction } from 'i18next';
import type { DecisionSnapshot, DecisionReplay } from '../db/db';

export interface CalibrationStats {
  count: number;
  averageConfidence: number;
  averageMatch: number;
  hasEnoughData: boolean;
}

const matchScore = (match: DecisionReplay['expectationMatch']): number | null => {
  if (match === 'yes') return 100;
  if (match === 'partial') return 50;
  if (match === 'no') return 0;
  return null;
};

export const computeCalibration = (
  decisions: DecisionSnapshot[],
  replays: DecisionReplay[]
): CalibrationStats => {
  const replayed = replays
    .map((replay) => {
      const decision = decisions.find((item) => item.id === replay.decisionId);
      const score = matchScore(replay.expectationMatch);
      return decision && score !== null ? { decision, score } : null;
    })
    .filter((item): item is { decision: DecisionSnapshot; score: number } => item !== null);

  if (replayed.length === 0) {
    return { count: 0, averageConfidence: 0, averageMatch: 0, hasEnoughData: false };
  }

  const averageConfidence = replayed.reduce((sum, item) => sum + item.decision.confidence, 0) / replayed.length;
  const averageMatch = replayed.reduce((sum, item) => sum + item.score, 0) / replayed.length;

  return {
    count: replayed.length,
    averageConfidence: Math.round(averageConfidence),
    averageMatch: Math.round(averageMatch),
    hasEnoughData: replayed.length >= 5,
  };
};

export const getObservation = (
  confidence: number,
  expectationMatch: DecisionReplay['expectationMatch'],
  t: TFunction
): string[] => {
  if (!expectationMatch) return [];

  const observations: string[] = [];
  if (expectationMatch === 'yes' && confidence >= 55 && confidence <= 90) {
    observations.push(t('comparison.observationCalibratedGood', { c: confidence }));
  }
  if (expectationMatch === 'no' && confidence >= 70) {
    observations.push(t('comparison.observationOverconfident', { c: confidence }));
  }
  if (expectationMatch === 'yes' && confidence <= 40) {
    observations.push(t('comparison.observationUnderconfident', { c: confidence }));
  }
  if (expectationMatch === 'partial') {
    observations.push(t('comparison.observationPartial'));
  }
  return observations;
};

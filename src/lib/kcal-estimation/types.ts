export type Confidence = "low" | "medium" | "high";

export interface EstimateResult {
  calories: number;
  met: number;
  confidence: Confidence;
}

export type EstimateInput = {
  type: ActivityType;
  title: string;
  duration: number;
  distance?: number;
};
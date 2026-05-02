import { DEFAULT_MET_BY_TYPE, MET_RULES } from "./config";
import { inferDistanceBasedCardioMet, titleHasKeyword } from "./helpers";
import { EstimateInput, EstimateResult } from "./types";



function inferMet(entry: EstimateInput): Omit<EstimateResult, "calories"> {
  // if (entry.type === "cardio") {
    const distanceBased = inferDistanceBasedCardioMet(entry);
    console.log("distance-based inference", distanceBased, "for entry", entry);
    // if able to infer a MET from distance and duration, trust over title-based rules
    if (distanceBased) {
      return {
        met: distanceBased.met,
        confidence: distanceBased.confidence,
      };
    }
  // }

  const matchedRuleset = MET_RULES.find((ruleset) => {
    const title = entry.title.toLowerCase();
    // console.log("checking ruleset", ruleset, "against title", title);
    return titleHasKeyword(title, ruleset.keywords);
  });
  console.log("matched ruleset", matchedRuleset, "for entry", entry);

  if (matchedRuleset) {
    return {
      met: matchedRuleset.met,
      confidence: matchedRuleset.confidence,
    };
  }

  const fallback = DEFAULT_MET_BY_TYPE[entry.type];

  return {
    met: fallback.met,
    confidence: fallback.confidence,
  };
}


export function estimateCalories(
  entry: EstimateInput,
  weightKg: number,
  sex?: Sex,
): EstimateResult {
  const { met, confidence } = inferMet(entry);

  let calories = met * weightKg * (entry.duration / 60);

  // small biological adjustment
  if (sex === "female") {
    calories *= 0.95;
  }

  calories = Math.round(calories);

  return {
    calories,
    met,
    confidence,
  };
}
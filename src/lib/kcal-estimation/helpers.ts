import { Confidence, EstimateInput } from "./types";

export function titleHasKeyword(title: string, keywords: string[]): boolean {
  return keywords.some((keyword) => title.includes(keyword));
}

export function inferDistanceBasedCardioMet(
  entry: EstimateInput,
): { met: number; confidence: Confidence } | null {
  if (!entry.distance || entry.duration <= 0) return null;
  console.log("inferring distance-based MET for entry", entry);

  const title = entry.title.toLowerCase();
  const speed = entry.distance / (entry.duration / 60); // km/h

  console.log("calculated speed", speed, "km/h for entry", entry);

  if (titleHasKeyword(title, ["run", "jog"])) {
    if (speed < 8) return { met: 8.3, confidence: "high" };
    if (speed < 9.5) return { met: 9.0, confidence: "high" };
    if (speed < 10.5) return { met: 9.8, confidence: "high" };
    if (speed < 12) return { met: 11.0, confidence: "high" };
    return { met: 11.8, confidence: "high" };
  }

  if (titleHasKeyword(title, ["walk", "hike"])) {
    if (speed < 3) return { met: 1.8, confidence: "medium" }; 
    if (speed < 4) return { met: 2.5, confidence: "high" };
    if (speed < 5) return { met: 3.3, confidence: "high" };
    if (speed < 6) return { met: 4.3, confidence: "high" };
    return { met: 5.0, confidence: "high" };
  }

  if (titleHasKeyword(title, ["bike", "cycle", "ride", "mtb", "bmx"])) {
    if (speed < 5) return { met: 2.0, confidence: "medium" };
    if (speed < 10) return { met: 4.0, confidence: "medium" };
    if (speed < 16) return { met: 4.0, confidence: "high" };
    if (speed < 19) return { met: 6.0, confidence: "high" };
    if (speed < 22) return { met: 8.0, confidence: "high" };
    return { met: 10.0, confidence: "high" };
  }

  return null;
}

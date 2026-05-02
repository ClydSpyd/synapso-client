import { Confidence } from "./types";

export const DEFAULT_MET_BY_TYPE: Record<
  ActivityType,
  { met: number; confidence: Confidence; label: string }
> = {
  cardio: { met: 6.5, confidence: "medium", label: "generic cardio" },
  strength: { met: 5.0, confidence: "medium", label: "generic strength" },
  sport: { met: 6.5, confidence: "medium", label: "generic sport" },
  conditioning: {
    met: 7.0,
    confidence: "medium",
    label: "generic conditioning",
  },
  mobility: { met: 2.5, confidence: "medium", label: "generic mobility" },
  recovery: { met: 2.0, confidence: "medium", label: "generic recovery" },
  mind_body: { met: 2.7, confidence: "medium", label: "generic mind-body" },
};

type MetRule = {
  keywords: string[];
  met: number;
  confidence: Confidence;
  label: string;
};

export const MET_RULES: MetRule[] = [
  // cardio
  {
    keywords: ["swim", "swimming"],
    met: 7.0,
    confidence: "medium",
    label: "swimming",
  },
  {
    keywords: ["elliptical"],
    met: 5.0,
    confidence: "medium",
    label: "elliptical",
  },
  {
    keywords: ["row", "rowing"],
    met: 7.0,
    confidence: "medium",
    label: "rowing",
  },
  {
    keywords: ["stairmaster", "stair", "stairs"],
    met: 8.0,
    confidence: "medium",
    label: "stairmaster",
  },
  { keywords: ["spin"], met: 8.0, confidence: "medium", label: "spin class" },
  { keywords: ["skate"], met: 3.8, confidence: "medium", label: "skating" },
  {
    keywords: ["aerobic", "cardio"],
    met: 6.5,
    confidence: "medium",
    label: "generic cardio",
  },

  //   strength
  {
    keywords: ["heavy", "deadlift", "squat", "leg day"],
    met: 6.0,
    confidence: "medium",
    label: "vigorous strength",
  },
  {
    keywords: ["bench", "press", "push", "pull", "weights", "lifting"],
    met: 5.0,
    confidence: "medium",
    label: "strength training",
  },
  {
    keywords: ["gym", "workout"],
    met: 4.5,
    confidence: "medium",
    label: "generic gym workout",
  },

  //   sport
  {
    keywords: ["football", "soccer", "basketball", "rugby"],
    met: 7.0,
    confidence: "medium",
    label: "field/court sport",
  },
  {
    keywords: ["tennis", "padel", "squash", "badminton"],
    met: 6.0,
    confidence: "medium",
    label: "racket sport",
  },
  {
    keywords: ["boxing", "wrestling", "martial arts", "mma"],
    met: 8.0,
    confidence: "medium",
    label: "combat sport",
  },
  { keywords: ["golf"], met: 4.5, confidence: "medium", label: "golf" },
  {
    keywords: ["ski", "snowboard"],
    met: 6.5,
    confidence: "medium",
    label: "snow sport",
  },

  //   conditioning
  {
    keywords: ["hiit", "crossfit", "metcon"],
    met: 8.5,
    confidence: "medium",
    label: "high intensity conditioning",
  },
  {
    keywords: ["circuit", "bootcamp", "intervals", "sprints"],
    met: 7.5,
    confidence: "medium",
    label: "conditioning circuit",
  },
  {
    keywords: ["burpees"],
    met: 8.0,
    confidence: "medium",
    label: "bodyweight conditioning",
  },

  //   mobility
  {
    keywords: ["stretch", "stretching", "mobility", "joint work"],
    met: 2.5,
    confidence: "medium",
    label: "mobility",
  },
  {
    keywords: ["warm up", "warmup"],
    met: 2.8,
    confidence: "medium",
    label: "warm up",
  },

  //   recovery
  {
    keywords: ["foam roll", "foam rolling"],
    met: 2.0,
    confidence: "medium",
    label: "foam rolling",
  },
  {
    keywords: ["walk"],
    met: 1.8,
    confidence: "medium",
    label: "walk",
  },
  {
    keywords: ["rehab", "recovery", "restorative"],
    met: 2.0,
    confidence: "medium",
    label: "recovery",
  },

  //   mind_body
  { keywords: ["yoga"], met: 2.8, confidence: "medium", label: "yoga" },
  { keywords: ["pilates"], met: 3.0, confidence: "medium", label: "pilates" },
  { keywords: ["tai chi"], met: 3.0, confidence: "medium", label: "tai chi" },
  {
    keywords: [
      "meditation",
      "breath",
      "breathwork",
      "mindfulness",
      "relaxation",
    ],
    met: 1.5,
    confidence: "medium",
    label: "meditation / breathwork",
  },
];
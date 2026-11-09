export const qualityProfiles = {
  mobile: { maxDpr: 1.25, segments: 48 },
  desktop: { maxDpr: 1.5, segments: 64 },
} as const;

export type QualityProfile =
  (typeof qualityProfiles)[keyof typeof qualityProfiles];

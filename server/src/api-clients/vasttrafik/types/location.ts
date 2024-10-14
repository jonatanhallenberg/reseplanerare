//Setup zod validation
import { z } from "zod";

export const locationSchema = z.object({
  gid: z.string().optional(),
  name: z.string(),
  locationType: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  hasLocalService: z.boolean().optional(),
});

export type Location = z.infer<typeof locationSchema>;

export const searchLocationResponseSchema = z.object({
  results: z.array(locationSchema),
  pagination: z.object({
    limit: z.number(),
    offset: z.number(),
    size: z.number(),
  }),
  links: z.object({
    next: z.string(),
    current: z.string(),
  }),
});

export type SearchLocationResponse = z.infer<
  typeof searchLocationResponseSchema
>;

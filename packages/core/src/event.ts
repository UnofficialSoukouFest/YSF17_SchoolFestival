import * as v from 'valibot'

export const eventSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  startTime: v.pipe(v.string(), v.isoDateTime()),
  endTime: v.pipe(v.string(), v.isoDateTime()),
  location: v.string(),
  id: v.string(),
  eventType: v.string(),
})

export const organizationSchema = v.object({
  team: v.string(),
  programId: v.pipe(v.string(), v.nonEmpty(), v.slug()),
  summary: v.string(),
  hashtag: v.array(v.string()),
  timetable: v.array(eventSchema),
})

export type OrganizationEvent = v.InferInput<typeof organizationSchema>

export function parseEventsData(input: string): OrganizationEvent[] {
  const orgEventSchema = v.array(organizationSchema)
  return v.parse(orgEventSchema, input)
}

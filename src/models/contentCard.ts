import { z } from 'zod'

export const ContentCardSchema = z.object({
  id: z.string().uuid(),
  imageUri: z.string().url().default('https://picsum.photos/500/500'),
  textData: z.object({
    title: z.string(),
    subTitle: z.string(),
    body: z.string(),
    author: z.object({
      first: z.string(),
      last: z.string(),
    }),
  }),
  metadata: z.object({
    priority: z.number().int(),
    publishDate: z.coerce.date(),
  }),
  comments: z.array(
    z.object({
      text: z.string(),
      author: z.string(),
      profilePic: z.string().url().default('https://picsum.photos/200'),
      likes: z.number().int().default(0),
    }),
  ),
})

export type ContentCard = z.infer<typeof ContentCardSchema>

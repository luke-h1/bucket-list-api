import { z } from 'zod';

const payload = {
  body: z.object({
    title: z.string({
      required_error: 'Title is a required field',
    }),
    description: z.string({
      required_error: 'Description is a required field',
    }),
  }),
};

const params = {
  params: z.object({
    bucketlistId: z.string({
      required_error: 'bucketlistId is required',
    }),
  }),
};

export const createBucketlistSchema = z.object({
  ...payload,
});

export const updateBucketlistSchema = z.object({
  ...payload,
  ...params,
});

export const deleteBucketlistSchema = z.object({
  ...params,
});

export const getOneBucketlistSchema = z.object({
  ...params,
});

export type createBucketlistInput = z.TypeOf<typeof createBucketlistSchema>;
export type updateBucketlistInput = z.TypeOf<typeof updateBucketlistSchema>;
export type deleteBucketlistInput = z.TypeOf<typeof deleteBucketlistSchema>;
export type getOneBucketlistInput = z.TypeOf<typeof getOneBucketlistSchema>;

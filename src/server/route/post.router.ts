import {
  createPostSchema,
  getSinglePostSchema,
} from "../../schema/post.schema";
import { createRouter } from "../createRouter";

import * as trpc from "@trpc/server";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create a post if you are not logged",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
      return post;
    },
  })
  .query("posts", {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  });

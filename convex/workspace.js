// export const CreateWorkspace = v.action({
//   args: {
//     messages:v.any(),
//     user:v.id('users')
// },
//     handler: async (ctx, args) => {
//         const workspaceId = await ctx.db.insert('workspace',{
//             messsages:args.messages,
//             user:args.user
//         })
//         return workspaceId;
//     }
    

// })
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Reusable message validator
const messageSchema = v.object({
  role: v.string(),
  content: v.string(),
  picture: v.optional(v.string())
});

export const CreateWorkspace = mutation({
  args: {
    messages: v.array(messageSchema),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("workspace", {
      messages: args.messages,
      user: args.user,
    });
  }
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.workspaceId);
  }
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.array(messageSchema), // ✅ enforce same structure
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
  }
});

// export const UpdateFiles = mutation({
//   args: {
//     workspaceId: v.id("workspace"),
//     filesData: v.any(), // ✅ enforce same structure
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.patch(args.workspaceId, {
//       fileData: args.files,
//     });
//   }
// });

export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),  // ✅ renamed here
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.workspaceId, {
      files: args.files,  // ✅ consistent field name
    });
  },
});

export const GetAllWorkspace=query({
  args:{
    userId:v.id('users')
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.query('workspace')
      .filter(q=>q.eq(q.field('user'),args.userId))
      .collect();

      return result;
  }
})
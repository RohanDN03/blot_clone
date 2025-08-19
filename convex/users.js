import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create User Mutation
export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
  //   const existingUsers = await ctx.db
  //     .query("users")
  //     .filter((q) => q.eq(q.field("email"), args.email))
  //     .collect();

  //   if (existingUsers.length === 0) {
  //     const result = await ctx.db.insert("users", {
  //       name: args.name,
  //       email: args.email,
  //       picture: args.picture,
  //       uid: args.uid,
  //       token:50000
  //     });
  //     console.log("Inserted user ID:", result);
  //   }
  const existingUsers = await ctx.db
  .query("users")
  .filter((q) => q.eq(q.field("email"), args.email))
  .collect();

if (existingUsers.length === 0) {
  await ctx.db.insert("users", {
    name: args.name,
    email: args.email,
    picture: args.picture,
    uid: args.uid,
    token: 50000
  });
} else {
  // make sure old users also get a token if missing
  const user = existingUsers[0];
  if (user.token === undefined || user.token === null || isNaN(user.token)) {
  await ctx.db.patch(user._id, { token: 50000 });
}
}
  },
});

// Get User Query
export const getUser=query({
  args: {
    email:v.string()
  },
  handler: async (ctx, args) => {
    const existingUsers = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return existingUsers[0] || null; // Return null if not found
  },
});


export const UpdateToken=mutation({
  args:{
    token:v.number(),
    userId:v.id('users')
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.patch(args.userId,{
      token:args.token
    });
    return result;
  }
})


export const fixUserTokens = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      if (user.token === undefined || user.token === null || isNaN(user.token)) {
        await ctx.db.patch(user._id, { token: 50000 });
      }
    }
    return "Fixed NaN/missing tokens";
  }
});
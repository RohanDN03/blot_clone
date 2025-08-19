// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";


// export default defineSchema({
//     users:defineTable({
//         name:v.string(),
//         email:v.string(),
//         picture:v.string(),
//         uid:v.string()
//     }),
//     workspace:defineTable({
//         messages:v.string(),
//         fileData:v.optional(v.any()),
//         user:v.id('users')
//     })
// })
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
    token:v.optional(v.number())
  }),
  workspace: defineTable({
    messages: v.array(
      v.object({
        role: v.string(),
        content: v.string(),
        picture: v.optional(v.string()) // ✅ allow picture if present
      })
    ),
    files: v.optional(v.any()),
    user: v.id("users"),
  })
});
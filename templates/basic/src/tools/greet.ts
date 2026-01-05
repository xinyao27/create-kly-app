import { tool } from "kly";
import { z } from "zod";

export const greetTool = tool({
  name: "greet",
  description: "Say hello to someone",
  inputSchema: z.object({
    name: z.string().describe("Name to greet"),
    excited: z.boolean().default(false).describe("Add exclamation mark"),
  }),
  execute: async ({ name, excited }) => {
    const mark = excited ? "!" : ".";
    return `Hello, ${name}${mark}`;
  },
});

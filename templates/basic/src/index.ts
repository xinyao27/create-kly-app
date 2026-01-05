import { defineApp } from "kly";
import { greetTool } from "./tools/greet";
import { weatherTool } from "./tools/weather";

export default defineApp({
  name: "my-kly-app",
  version: "0.1.0",
  description: "A kly application with multiple tools",
  tools: [greetTool, weatherTool],
  instructions: "Help users with greetings and weather information",
});

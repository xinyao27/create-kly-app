# My Kly App

A multi-tool kly application with organized structure.

## Getting Started

Install dependencies:

```bash
bun install
```

Run locally:

```bash
bun run start
```

## Usage

### CLI Mode

Get current weather:

```bash
bun run start current --city "Tokyo"
```

Get forecast:

```bash
bun run start forecast --city "Tokyo" --days 5
```

### Remote Execution

After pushing to GitHub, others can run your app without installation:

```bash
kly run github.com/yourusername/your-repo
```

## Project Structure

```
.
├── src/
│   ├── index.ts              # Main app definition
│   └── tools/                # Individual tools
│       ├── current-weather.ts
│       └── forecast.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Tools

1. Create a new file in `src/tools/`
2. Define your tool using the `tool()` function
3. Export and add it to the `tools` array in `src/index.ts`

Example:

```typescript
// src/tools/my-tool.ts
import { z } from "zod"
import { tool } from "kly"

export const myTool = tool({
  name: "my-tool",
  description: "What it does",
  inputSchema: z.object({
    param: z.string().describe("Parameter description"),
  }),
  execute: async ({ param }) => {
    // Your logic here
    return { result: "success" }
  },
})
```

## Learn More

- [Kly Documentation](https://github.com/xinyao27/kly)
- [Examples](https://github.com/xinyao27/kly/tree/main/examples)

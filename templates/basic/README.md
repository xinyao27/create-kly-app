# My Kly App

A basic kly application with a single tool.

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

Run the greet tool:

```bash
bun run start greet --name "World"
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
│   └── index.ts       # Main app definition with tools
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

- [Kly Documentation](https://github.com/xinyao27/kly)
- [Examples](https://github.com/xinyao27/kly/tree/main/examples)

# My Kly App

A kly application with multiple tools and AI support.

## Install Kly

```bash
npm install -g kly
# or
bun install -g kly
```

## Setup

Install dependencies:

```bash
bun install
```

## Usage

### Run from GitHub

Run any kly app directly from GitHub:

```bash
kly run user/repo
```

### Run as MCP Server

Start as MCP server for Claude Desktop/Code:

```bash
kly mcp user/repo
```

### Local Development

Run locally during development:

```bash
bun run start
```

### Global Installation

Install as a global command:

```bash
kly install .
# or
kly link
```

After installation, run directly:

```bash
my-kly-app
```

## API Keys (Optional)

Set up your API keys for AI-powered features:

```bash
export OPENAI_API_KEY=sk-...
# or
export ANTHROPIC_API_KEY=sk-ant-...
```

Configure your preferred model:

```bash
kly models
```

## Project Structure

```
.
├── src/
│   ├── index.ts      # Entry: defineApp with tools
│   └── tools/        # Tool definitions
│       ├── greet.ts
│       └── weather.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

- [Kly Documentation](https://github.com/xinyao27/kly)

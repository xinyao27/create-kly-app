# create-kly-app

Create [kly](https://github.com/xinyao27/kly) applications with a single command.

## Usage

### Remote Execution (Recommended)

No installation required! Run directly from GitHub:

```bash
kly run github.com/xinyao27/create-kly-app
```

The tool will interactively guide you through:
1. Choosing a project name
2. Selecting a template
3. Setting up your new kly application

### With Arguments

You can also pass arguments directly:

```bash
kly run github.com/xinyao27/create-kly-app --name my-app --template basic
```

## Available Templates

### 🌟 Basic
A minimal single-tool application - perfect for getting started.

**Best for:**
- Learning kly basics
- Simple CLI tools
- Quick prototypes

**Includes:**
- Single tool example
- Basic parameter validation
- Minimal dependencies

### 🔧 Multi-tool
Multiple tools with organized project structure.

**Best for:**
- Applications with multiple related commands
- More complex CLI tools
- Projects that will grow over time

**Includes:**
- Multiple tool examples
- Organized file structure (`src/tools/`)
- Best practices for scaling

### 🤖 AI-powered
AI integration with natural language support.

**Best for:**
- AI-powered applications
- Natural language interfaces
- Tools that need LLM capabilities

**Includes:**
- Natural language parameter extraction
- AI SDK integration (OpenAI, Anthropic)
- Permission system for API keys
- Examples of AI-powered tools

## What is kly?

[kly](https://github.com/xinyao27/kly) is a TypeScript framework for building universal AI applications with a "Write Once, Run Everywhere" philosophy.

**Key Features:**
- 🚀 **Universal**: Run as CLI, MCP server, or remote app
- 🤖 **AI-Native**: Built-in support for multiple LLM providers
- 🔒 **Secure**: Permission system and sandbox execution
- 📦 **Remote Ready**: Run directly from GitHub without installation

## Quick Start

1. **Create a new app:**
   ```bash
   kly run github.com/xinyao27/create-kly-app
   ```

2. **Install dependencies:**
   ```bash
   cd my-app
   bun install
   ```

3. **Run locally:**
   ```bash
   bun run start
   ```

4. **Push to GitHub and share:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/my-app.git
   git push -u origin main
   ```

5. **Others can now run your app:**
   ```bash
   kly run github.com/yourusername/my-app
   ```

## Examples

### Create a basic app
```bash
kly run github.com/xinyao27/create-kly-app --name hello-world --template basic
```

### Create a multi-tool app
```bash
kly run github.com/xinyao27/create-kly-app --name weather-cli --template multi-tool
```

### Create an AI-powered app
```bash
kly run github.com/xinyao27/create-kly-app --name ai-assistant --template ai-powered
```

## About this Tool

`create-kly-app` is itself a kly application! It demonstrates:
- Using giget for template scaffolding
- Interactive prompts with @clack/prompts
- File operations and project setup
- The "Write Once, Run Everywhere" philosophy

## Learn More

- [kly Documentation](https://github.com/xinyao27/kly)
- [kly Examples](https://github.com/xinyao27/kly/tree/main/examples)
- [Report Issues](https://github.com/xinyao27/create-kly-app/issues)

## License

MIT

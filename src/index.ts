import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  cancel,
  intro,
  isCancel,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import { downloadTemplate } from "giget";
import { defineApp, tool } from "kly";
import pc from "picocolors";
import { z } from "zod";

const TEMPLATES = {
  basic: {
    name: "Basic",
    description: "Minimal single-tool application",
  },
  "multi-tool": {
    name: "Multi-tool",
    description: "Multiple tools with organized structure",
  },
  "ai-powered": {
    name: "AI-powered",
    description: "AI integration with natural language support",
  },
} as const;

type TemplateKey = keyof typeof TEMPLATES;

const createTool = tool({
  name: "create",
  description: "Create a new kly application from template",
  inputSchema: z.object({
    name: z.string().describe("Project name").optional(),
    template: z
      .enum(["basic", "multi-tool", "ai-powered"])
      .describe("Template to use")
      .optional(),
    dir: z
      .string()
      .describe("Target directory (defaults to project name)")
      .optional(),
  }),
  execute: async (args, _context) => {
    intro(pc.bgCyan(pc.black(" create-kly-app ")));

    // Ask for project name if not provided
    let projectName = args.name;
    if (!projectName) {
      const nameResult = await text({
        message: "What is your project name?",
        placeholder: "my-kly-app",
        validate: (value) => {
          if (!value) return "Project name is required";
          if (!/^[a-z0-9-]+$/.test(value)) {
            return "Project name can only contain lowercase letters, numbers, and hyphens";
          }
          return undefined;
        },
      });

      if (isCancel(nameResult)) {
        cancel("Operation cancelled");
        process.exit(0);
      }

      projectName = nameResult as string;
    }

    // Ask for template if not provided
    let template = args.template;
    if (!template) {
      const templateResult = await select({
        message: "Which template would you like to use?",
        options: Object.entries(TEMPLATES).map(([key, value]) => ({
          value: key,
          label: value.name,
          hint: value.description,
        })),
      });

      if (isCancel(templateResult)) {
        cancel("Operation cancelled");
        process.exit(0);
      }

      template = templateResult as TemplateKey;
    }

    const targetDir = args.dir || projectName;
    const fullPath = join(process.cwd(), targetDir);

    // Check if directory already exists
    if (existsSync(fullPath)) {
      throw new Error(`Directory ${targetDir} already exists`);
    }

    // Download template using giget
    const s = spinner();
    s.start(`Creating project from ${TEMPLATES[template].name} template...`);

    try {
      await downloadTemplate(
        `github:xinyao27/create-kly-app/templates/${template}`,
        {
          dir: fullPath,
          install: false,
          offline: false,
          preferOffline: true,
        },
      );

      s.stop(`Project created successfully!`);

      // Replace placeholder values in package.json
      const packageJsonPath = join(fullPath, "package.json");
      if (existsSync(packageJsonPath)) {
        const packageJson = await Bun.file(packageJsonPath).json();
        packageJson.name = projectName;
        await Bun.write(
          packageJsonPath,
          `${JSON.stringify(packageJson, null, 2)}\n`,
        );
      }

      outro(
        pc.green(`\n✓ Project created at ${pc.cyan(targetDir)}\n
Next steps:
  ${pc.cyan(`cd ${targetDir}`)}
  ${pc.cyan("bun install")}
  ${pc.cyan("bun run start")}

To run remotely:
  ${pc.cyan(`kly run github.com/yourusername/${projectName}`)}
`),
      );

      return {
        success: true,
        projectName,
        template,
        path: fullPath,
      };
    } catch (error) {
      s.stop(`Failed to create project`);
      throw error;
    }
  },
});

export default defineApp({
  name: "create-kly-app",
  version: "0.0.1",
  description: "Create kly applications with a single command",
  tools: [createTool],
  permissions: {
    sandbox: {
      network: {
        allowedDomains: [
          "github.com",
          "api.github.com",
          "raw.githubusercontent.com",
        ],
        deniedDomains: [],
      },
      filesystem: {
        allowWrite: ["*"],
      },
    },
  },
});

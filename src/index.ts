import { existsSync } from "node:fs";
import { join } from "node:path";
import { downloadTemplate } from "giget";
import { colors, defineApp, input, output, spinner, tool } from "kly";
import { z } from "zod";

const createTool = tool({
  name: "create",
  description: "Create a new kly application from template",
  inputSchema: z.object({
    name: z.string().describe("Project name").optional(),
    dir: z.string().describe("Target directory (defaults to project name)").optional(),
  }),
  execute: async (args, context) => {
    output(colors.bgCyan(colors.black(" create-kly-app ")));

    // Use invokeDir to get the directory where the user ran the command
    const workingDir = context.invokeDir || process.cwd();

    // Ask for project name if not provided
    let projectName = args.name;
    if (!projectName) {
      while (true) {
        const nameResult = await input({
          prompt: "What is your project name?",
          placeholder: "my-kly-app",
        });

        if (!nameResult) {
          output(colors.red("Project name is required"));
          continue;
        }
        if (!/^[a-z0-9-]+$/.test(nameResult)) {
          output(
            colors.red("Project name can only contain lowercase letters, numbers, and hyphens"),
          );
          continue;
        }
        projectName = nameResult;
        break;
      }
    }

    const targetDir = args.dir || projectName;
    const fullPath = join(workingDir, targetDir);

    // Check if directory already exists
    if (existsSync(fullPath)) {
      throw new Error(`Directory ${targetDir} already exists`);
    }

    // Download template using giget
    const s = spinner("Creating project...");

    try {
      await downloadTemplate("github:xinyao27/create-kly-app/templates/basic", {
        dir: fullPath,
        install: false,
        offline: false,
        preferOffline: true,
        auth: process.env.GIGET_AUTH,
      });

      s.succeed("Project created successfully!");

      // Replace placeholder values in package.json
      const packageJsonPath = join(fullPath, "package.json");
      if (existsSync(packageJsonPath)) {
        const packageJson = await Bun.file(packageJsonPath).json();
        packageJson.name = projectName;
        await Bun.write(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
      }

      output(
        colors.green(`\n✓ Project created at ${colors.cyan(targetDir)}\n
Next steps:
  ${colors.cyan(`cd ${targetDir}`)}
  ${colors.cyan("bun install")}
  ${colors.cyan("bun run start")}

To run remotely:
  ${colors.cyan(`kly run github.com/yourusername/${projectName}`)}
`),
      );

      return {
        success: true,
        projectName,
        path: fullPath,
      };
    } catch (err) {
      s.fail("Failed to create project");
      throw err;
    }
  },
});

export default defineApp({
  name: "create-kly-app",
  version: "0.0.1",
  description: "Create kly applications with a single command",
  tools: [createTool],
});

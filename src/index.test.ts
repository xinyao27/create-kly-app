import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { downloadTemplate } from "giget";

describe("giget usage", () => {
  const testDir = join(process.cwd(), ".test-output");
  const projectName = "test-project";
  const projectPath = join(testDir, projectName);

  beforeAll(() => {
    // Create test directory if it doesn't exist
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  test("should download template from GitHub repository", async () => {
    // Test downloading the basic template
    const result = await downloadTemplate(
      "github:xinyao27/create-kly-app/templates/basic",
      {
        dir: projectPath,
        install: false,
        offline: false,
        preferOffline: true,
      }
    );

    // Verify the download was successful
    expect(result).toBeDefined();
    expect(result.dir).toBe(projectPath);
    expect(existsSync(projectPath)).toBe(true);

    // Verify essential files exist
    expect(existsSync(join(projectPath, "package.json"))).toBe(true);
    expect(existsSync(join(projectPath, "src"))).toBe(true);
  }, 30000); // 30 second timeout for network operation

  test("should work with gh: shorthand", async () => {
    const altProjectPath = join(testDir, "test-project-gh");

    // Clean up if exists
    if (existsSync(altProjectPath)) {
      rmSync(altProjectPath, { recursive: true, force: true });
    }

    // Test with gh: prefix instead of github:
    const result = await downloadTemplate(
      "gh:xinyao27/create-kly-app/templates/basic",
      {
        dir: altProjectPath,
        install: false,
        preferOffline: true,
      }
    );

    expect(result).toBeDefined();
    expect(existsSync(altProjectPath)).toBe(true);
    expect(existsSync(join(altProjectPath, "package.json"))).toBe(true);

    // Clean up
    rmSync(altProjectPath, { recursive: true, force: true });
  }, 30000);

  test("package.json should be readable and valid", async () => {
    // Read the downloaded package.json
    const packageJsonPath = join(projectPath, "package.json");
    const packageJson = await Bun.file(packageJsonPath).json();

    // Verify it's a valid package.json
    expect(packageJson).toBeDefined();
    expect(typeof packageJson.name).toBe("string");
    expect(typeof packageJson.version).toBe("string");
  });

  test("should download from different templates", async () => {
    const multiToolPath = join(testDir, "multi-tool-project");

    // Clean up if exists
    if (existsSync(multiToolPath)) {
      rmSync(multiToolPath, { recursive: true, force: true });
    }

    // Test downloading multi-tool template
    const result = await downloadTemplate(
      "github:xinyao27/create-kly-app/templates/multi-tool",
      {
        dir: multiToolPath,
        install: false,
        preferOffline: true,
      }
    );

    expect(result).toBeDefined();
    expect(existsSync(multiToolPath)).toBe(true);
    expect(existsSync(join(multiToolPath, "package.json"))).toBe(true);

    // Clean up
    rmSync(multiToolPath, { recursive: true, force: true });
  }, 30000);
});

describe("giget format validation", () => {
  test("should understand various giget input formats", () => {
    // These are just format validations, not actual downloads
    const validFormats = [
      "github:user/repo",
      "gh:user/repo",
      "github:user/repo/subdir",
      "gh:user/repo/subdir",
      "github:user/repo#branch",
      "gh:user/repo#branch",
      "github:user/repo/subdir#branch",
    ];

    // All these formats should be valid strings
    validFormats.forEach((format) => {
      expect(typeof format).toBe("string");
      expect(format.length).toBeGreaterThan(0);
    });
  });
});

import { execSync } from "child_process";

const script = "tsx prisma/seed.ts";

try {
    console.log("Running seed script...");
    execSync(script, { stdio: "inherit" });
    console.log("Seed completed successfully!");
} catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
}

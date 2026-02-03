import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Log an admin action for security and auditing purposes.
 */
export async function logAdminAction(
    adminId: string,
    adminName: string,
    action: string,
    details?: any
) {
    try {
        const headersList = await headers();
        // X-Forwarded-For is typical behind proxies/Vercel
        const ip = headersList.get("x-forwarded-for") || "unknown";

        await prisma.auditLog.create({
            data: {
                adminId,
                adminName,
                action,
                details: details ? JSON.stringify(details) : null,
                ipAddress: ip,
            },
        });
    } catch (error) {
        // We generally don't want audit logging to break the main request flow,
        // but we should log the failure to the console.
        console.error("Failed to write audit log:", error);
    }
}

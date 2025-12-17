"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function joinUniversity(universityId: string) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                universityId: universityId,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to join university:", error);
        throw new Error("Failed to join university");
    }
}

export async function leaveUniversity() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                universityId: null,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to leave university:", error);
        throw new Error("Failed to leave university");
    }
}

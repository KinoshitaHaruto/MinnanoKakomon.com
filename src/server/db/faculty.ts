
import { prisma } from "@/lib/prisma";
import type { Faculty } from "@prisma/client";

export async function listFacultiesByUniversityId(
  universityId: string
): Promise<Faculty[]> {
  return prisma.faculty.findMany({
    where: { universityId },
  });
}

export async function getFacultyById(
  facultyId: string
): Promise<Faculty | null> {
  return prisma.faculty.findUnique({
    where: { id: facultyId },
  });
}

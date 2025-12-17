
import { prisma } from "@/lib/prisma";
import type { University } from "@prisma/client";

export async function listUniversities(): Promise<University[]> {
  return prisma.university.findMany();
}

export async function getUniversityById(
  universityId: string
): Promise<University | null> {
  return prisma.university.findUnique({
    where: { id: universityId },
  });
}

export async function searchUniversities(
  query: string
): Promise<University[]> {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return prisma.university.findMany({
    where: {
      OR: [
        { name: { contains: lowerQuery } },
      ],
    },
  });
}

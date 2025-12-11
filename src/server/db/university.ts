import { mockUniversities } from "./mock-data";
import type { University } from "@/types";

export async function listUniversities(): Promise<University[]> {
  return mockUniversities;
}

export async function getUniversityById(
  universityId: string
): Promise<University | undefined> {
  return mockUniversities.find((u) => u.id === universityId);
}

export async function searchUniversities(
  query: string
): Promise<University[]> {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return mockUniversities.filter(
    (u) =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.domain?.toLowerCase().includes(lowerQuery)
  );
}


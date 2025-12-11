import { mockFaculties } from "./mock-data";
import type { Faculty } from "@/types";

export async function listFacultiesByUniversityId(
  universityId: string
): Promise<Faculty[]> {
  return mockFaculties.filter((faculty) => faculty.universityId === universityId);
}

export async function getFacultyById(
  facultyId: string
): Promise<Faculty | undefined> {
  return mockFaculties.find((faculty) => faculty.id === facultyId);
}


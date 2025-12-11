import { mockDepartments } from "./mock-data";
import type { Department } from "@/types";

export async function listDepartmentsByFacultyId(
  facultyId: string
): Promise<Department[]> {
  return mockDepartments.filter((department) => department.facultyId === facultyId);
}

export async function getDepartmentById(
  departmentId: string
): Promise<Department | undefined> {
  return mockDepartments.find((department) => department.id === departmentId);
}


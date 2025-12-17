
import { prisma } from "@/lib/prisma";
import type { Department } from "@prisma/client";

export async function listDepartmentsByFacultyId(
  facultyId: string
): Promise<Department[]> {
  return prisma.department.findMany({
    where: { facultyId },
  });
}

export async function getDepartmentById(
  departmentId: string
): Promise<Department | null> {
  return prisma.department.findUnique({
    where: { id: departmentId },
  });
}

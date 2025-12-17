
import { prisma } from "@/lib/prisma";
import type { Course, Department, Faculty, University } from "@prisma/client";

export async function listCoursesByDepartmentId(
  departmentId: string
): Promise<Course[]> {
  return prisma.course.findMany({
    where: { departmentId },
  });
}

export async function getCourseById(
  courseId: string
): Promise<Course | null> {
  return prisma.course.findUnique({
    where: { id: courseId },
  });
}

export interface CourseDetail {
  course?: Course | null;
  department?: Department | null;
  faculty?: Faculty | null;
  university?: University | null;
}

export async function getCourseDetail(
  courseId: string
): Promise<CourseDetail> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      department: {
        include: {
          faculty: {
            include: {
              university: true,
            },
          },
        },
      },
    },
  });

  if (!course) return { course: null };

  const { department } = course;
  const { faculty } = department || {};
  const { university } = faculty || {};

  return { course, department, faculty, university };
}

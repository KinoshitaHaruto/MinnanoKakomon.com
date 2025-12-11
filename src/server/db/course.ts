import {
  mockCourses,
  mockDepartments,
  mockFaculties,
  mockUniversities,
} from "./mock-data";
import type { Course, Department, Faculty, University } from "@/types";

export async function listCoursesByDepartmentId(
  departmentId: string
): Promise<Course[]> {
  return mockCourses.filter((course) => course.departmentId === departmentId);
}

export async function getCourseById(
  courseId: string
): Promise<Course | undefined> {
  return mockCourses.find((course) => course.id === courseId);
}

export interface CourseDetail {
  course?: Course;
  department?: Department;
  faculty?: Faculty;
  university?: University;
}

export async function getCourseDetail(
  courseId: string
): Promise<CourseDetail> {
  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) return { course: undefined };

  const department = mockDepartments.find((d) => d.id === course.departmentId);
  const faculty = department
    ? mockFaculties.find((f) => f.id === department.facultyId)
    : undefined;
  const university = faculty
    ? mockUniversities.find((u) => u.id === faculty.universityId)
    : undefined;

  return { course, department, faculty, university };
}


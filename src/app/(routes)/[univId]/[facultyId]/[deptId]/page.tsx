import Link from "next/link";
import { CourseGrid } from "@/components/features/course/CourseGrid";
import { getUniversityById } from "@/server/db/university";
import { getFacultyById } from "@/server/db/faculty";
import { getDepartmentById } from "@/server/db/department";
import { listCoursesByDepartmentId } from "@/server/db/course";

interface DepartmentPageProps {
  params: Promise<{ univId: string; facultyId: string; deptId: string }>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { univId, facultyId, deptId } = await params;

  const university = await getUniversityById(univId);
  const faculty = await getFacultyById(facultyId);
  const department = await getDepartmentById(deptId);
  const courses = await listCoursesByDepartmentId(deptId);

  if (!university || !faculty || !department) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ページが見つかりませんでした</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            トップページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-gray-900">
              トップ
            </Link>
            <span>/</span>
            <Link href={`/${university.id}`} className="hover:text-gray-900">
              {university.name}
            </Link>
            <span>/</span>
            <Link href={`/${university.id}/${faculty.id}`} className="hover:text-gray-900">
              {faculty.name}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{department.name}</h1>
          <p className="text-gray-600">
            {university.name} / {faculty.name}
          </p>
        </div>

        <CourseGrid courses={courses} />

        <div className="mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            新しい講義を登録
          </button>
        </div>
      </main>
    </div>
  );
}


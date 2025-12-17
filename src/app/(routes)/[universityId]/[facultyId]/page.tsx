import Link from "next/link";
import { DepartmentGrid } from "@/components/features/department/DepartmentGrid";
import { getUniversityById } from "@/server/db/university";
import { getFacultyById, listFacultiesByUniversityId } from "@/server/db/faculty";
import { listDepartmentsByFacultyId } from "@/server/db/department";

interface FacultyPageProps {
  params: Promise<{ universityId: string; facultyId: string }>;
}

export default async function FacultyPage({ params }: FacultyPageProps) {
  const { universityId, facultyId } = await params;

  const university = await getUniversityById(universityId);
  const faculty = await getFacultyById(facultyId);
  const departments = await listDepartmentsByFacultyId(facultyId);

  if (!university || !faculty) {
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
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{faculty.name}</h1>
          <p className="text-gray-600">{university.name}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">学科一覧</h2>
          <DepartmentGrid
            departments={departments}
            baseHref={`/${university.id}/${faculty.id}`}
          />
        </div>

        <div className="mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            学科を追加
          </button>
        </div>
      </main>
    </div>
  );
}


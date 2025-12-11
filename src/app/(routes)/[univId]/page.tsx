import Link from "next/link";
import { FacultyGrid } from "@/components/features/faculty/FacultyGrid";
import { getUniversityById } from "@/server/db/university";
import { listFacultiesByUniversityId } from "@/server/db/faculty";

interface UniversityPageProps {
  params: Promise<{ univId: string }>;
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { univId } = await params;
  const university = await getUniversityById(univId);
  const faculties = await listFacultiesByUniversityId(univId);

  if (!university) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            大学が見つかりませんでした
          </h1>
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
          <Link href="/" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← トップに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{university.name}</h1>
          {university.domain && <p className="text-gray-600">{university.domain}</p>}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">学部一覧</h2>
          <FacultyGrid faculties={faculties} baseHref={`/${university.id}`} />
        </div>

        <div className="mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            学部が見つからない場合は追加
          </button>
        </div>
      </main>
    </div>
  );
}


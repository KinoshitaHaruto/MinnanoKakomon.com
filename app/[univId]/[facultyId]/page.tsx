"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  getUniversityById,
  getFacultiesByUniversityId,
  getDepartmentsByFacultyId,
} from "@/lib/mock-data";

export default function FacultyPage() {
  const params = useParams();
  const router = useRouter();
  const univId = params.univId as string;
  const facultyId = params.facultyId as string;

  const university = getUniversityById(univId);
  const faculty = getFacultiesByUniversityId(univId).find(
    (f) => f.id === facultyId
  );
  const departments = getDepartmentsByFacultyId(facultyId);
  const [showAddDialog, setShowAddDialog] = useState(false);

  if (!university || !faculty) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ページが見つかりませんでした
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            トップページに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => router.push("/")}
              className="hover:text-gray-900"
            >
              トップ
            </button>
            <span>/</span>
            <button
              onClick={() => router.push(`/${univId}`)}
              className="hover:text-gray-900"
            >
              {university.name}
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {faculty.name}
          </h1>
          <p className="text-gray-600">{university.name}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">学科一覧</h2>
          {departments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((department) => (
                <button
                  key={department.id}
                  onClick={() =>
                    router.push(`/${univId}/${facultyId}/${department.id}`)
                  }
                  className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {department.name}
                  </h3>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-8 text-center">
              まだ学科が登録されていません
            </p>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            学科を追加
          </button>
        </div>

        {showAddDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                新しい学科を追加
              </h3>
              <p className="text-gray-600 mb-4">
                この機能は実装中です。実際の実装では、フォームから学科名を入力して追加できます。
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    // TODO: 実際の実装ではここで学科を追加
                    setShowAddDialog(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  追加
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Star, ArrowUpDown } from "lucide-react";
import {
  getUniversityById,
  getFacultiesByUniversityId,
  getDepartmentsByFacultyId,
  getCoursesByDepartmentId,
  type Course,
} from "@/lib/mock-data";

type SortOption = "rakutan" | "newest" | "name";

export default function DepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const univId = params.univId as string;
  const facultyId = params.facultyId as string;
  const deptId = params.deptId as string;

  const university = getUniversityById(univId);
  const faculty = getFacultiesByUniversityId(univId).find(
    (f) => f.id === facultyId
  );
  const department = getDepartmentsByFacultyId(facultyId).find(
    (d) => d.id === deptId
  );
  const courses = getCoursesByDepartmentId(deptId);
  const [sortBy, setSortBy] = useState<SortOption>("rakutan");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const sortedCourses = useMemo(() => {
    const sorted = [...courses];
    switch (sortBy) {
      case "rakutan":
        return sorted.sort(
          (a, b) => (b.rakutanScore || 0) - (a.rakutanScore || 0)
        );
      case "newest":
        return sorted.reverse(); // MockなのでID順を逆順に
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
      default:
        return sorted;
    }
  }, [courses, sortBy]);

  if (!university || !faculty || !department) {
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

  const renderStars = (score?: number) => {
    if (!score) return <span className="text-gray-400">評価なし</span>;
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{score.toFixed(1)}</span>
      </div>
    );
  };

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
            <span>/</span>
            <button
              onClick={() => router.push(`/${univId}/${facultyId}`)}
              className="hover:text-gray-900"
            >
              {faculty.name}
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {department.name}
          </h1>
          <p className="text-gray-600">
            {university.name} / {faculty.name}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">講義一覧</h2>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="rakutan">楽単度順</option>
              <option value="newest">新着順</option>
              <option value="name">講義名順</option>
            </select>
          </div>
        </div>

        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sortedCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => router.push(`/course/${course.id}`)}
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>
                {course.professor && (
                  <p className="text-sm text-gray-600 mb-3">
                    教授: {course.professor}
                  </p>
                )}
                <div className="flex items-center">
                  {renderStars(course.rakutanScore)}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-12 text-center">
            まだ講義が登録されていません
          </p>
        )}

        <div className="mt-8">
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新しい講義を登録
          </button>
        </div>

        {showAddDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                新しい講義を登録
              </h3>
              <p className="text-gray-600 mb-4">
                この機能は実装中です。実際の実装では、フォームから講義情報を入力して追加できます。
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
                    // TODO: 実際の実装ではここで講義を追加
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


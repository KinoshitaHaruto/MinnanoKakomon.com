"use client";

import { useParams, useRouter } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import {
  getCourseById,
  getDepartmentsByFacultyId,
  getFacultiesByUniversityId,
  getUniversityById,
} from "@/lib/mock-data";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            講義が見つかりませんでした
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

  // Mock: 学科、学部、大学を取得（実際の実装ではリレーションから取得）
  const department = getDepartmentsByFacultyId("1").find(
    (d) => d.id === course.departmentId
  );
  const faculty = getFacultiesByUniversityId("1")[0];
  const university = getUniversityById("1");

  const renderStars = (score?: number) => {
    if (!score) return <span className="text-gray-400">評価なし</span>;
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium text-gray-700">
          {score.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          戻る
        </button>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              {university && (
                <>
                  <span>{university.name}</span>
                  <span>/</span>
                </>
              )}
              {faculty && (
                <>
                  <span>{faculty.name}</span>
                  <span>/</span>
                </>
              )}
              {department && <span>{department.name}</span>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.name}
            </h1>
            {course.professor && (
              <p className="text-lg text-gray-600 mb-4">
                教授: {course.professor}
              </p>
            )}
            <div className="flex items-center mb-6">
              {renderStars(course.rakutanScore)}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              レビュー・投稿
            </h2>
            <p className="text-gray-500 text-center py-8">
              まだレビューや投稿がありません
            </p>
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
              + レビューを投稿する
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              過去問・ノート
            </h2>
            <p className="text-gray-500 text-center py-8">
              まだリソースが登録されていません
            </p>
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
              + リソースを追加する
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


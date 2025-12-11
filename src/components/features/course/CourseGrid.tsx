"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Star } from "lucide-react";
import type { Course } from "@/types";

type SortOption = "rakutan" | "newest" | "name";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("rakutan");

  const sortedCourses = useMemo(() => {
    const sorted = [...courses];
    switch (sortBy) {
      case "rakutan":
        return sorted.sort(
          (a, b) => (b.rakutanScore || 0) - (a.rakutanScore || 0)
        );
      case "newest":
        return sorted.reverse(); // MockのためID順で代用
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
      default:
        return sorted;
    }
  }, [courses, sortBy]);

  const renderStars = (score?: number) => {
    if (!score) return <span className="text-gray-400 text-sm">評価なし</span>;
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

  if (sortedCourses.length === 0) {
    return (
      <p className="text-gray-500 py-12 text-center">
        まだ講義が登録されていません
      </p>
    );
  }

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedCourses.map((course) => (
          <Link
            key={course.id}
            href={`/course/${course.id}`}
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {course.name}
            </h3>
            {course.professor && (
              <p className="text-sm text-gray-600 mb-3">教授: {course.professor}</p>
            )}
            <div className="flex items-center">{renderStars(course.rakutanScore)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


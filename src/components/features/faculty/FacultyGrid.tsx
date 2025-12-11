import Link from "next/link";
import type { Faculty } from "@/types";

interface FacultyGridProps {
  faculties: Faculty[];
  baseHref: string;
}

export function FacultyGrid({ faculties, baseHref }: FacultyGridProps) {
  if (faculties.length === 0) {
    return (
      <p className="text-gray-500 py-8 text-center">まだ学部が登録されていません</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {faculties.map((faculty) => (
        <Link
          key={faculty.id}
          href={`${baseHref}/${faculty.id}`}
          className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all text-left"
        >
          <h3 className="text-lg font-medium text-gray-900">{faculty.name}</h3>
        </Link>
      ))}
    </div>
  );
}


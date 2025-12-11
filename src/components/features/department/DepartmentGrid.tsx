import Link from "next/link";
import type { Department } from "@/types";

interface DepartmentGridProps {
  departments: Department[];
  baseHref: string;
}

export function DepartmentGrid({ departments, baseHref }: DepartmentGridProps) {
  if (departments.length === 0) {
    return (
      <p className="text-gray-500 py-8 text-center">まだ学科が登録されていません</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {departments.map((department) => (
        <Link
          key={department.id}
          href={`${baseHref}/${department.id}`}
          className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all text-left"
        >
          <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
        </Link>
      ))}
    </div>
  );
}


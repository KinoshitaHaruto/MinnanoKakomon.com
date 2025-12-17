import { UniversitySearch } from "@/components/features/search/UniversitySearch";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            定期試験・過去問共有プラットフォーム
          </h1>
          <p className="text-gray-600 mb-12 text-center">
            その試験、AIと先輩が攻略済み。
          </p>
          <div className="mt-8 w-full">
            <UniversitySearch />
          </div>
        </div>
      </main>
    </div>
  );
}


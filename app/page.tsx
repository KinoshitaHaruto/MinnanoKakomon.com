"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchUniversities, type University } from "@/lib/mock-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const searchResults = useMemo(() => {
    return searchUniversities(searchQuery);
  }, [searchQuery]);

  const handleUniversitySelect = (university: University) => {
    router.push(`/${university.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            定期試験・過去問共有プラットフォーム
          </h1>
          <p className="text-gray-600 mb-12 text-center">
            大学の定期試験情報を共有しよう
          </p>

          <div className="w-full max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="大学名を検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {isFocused && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {searchResults.map((university) => (
                  <button
                    key={university.id}
                    onClick={() => handleUniversitySelect(university)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">
                      {university.name}
                    </div>
                    {university.domain && (
                      <div className="text-sm text-gray-500">
                        {university.domain}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {isFocused && searchQuery && searchResults.length === 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                該当する大学が見つかりませんでした
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

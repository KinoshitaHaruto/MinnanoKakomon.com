"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { University } from "@/types";
import { searchUniversitiesAction } from "@/server/actions/university";

export function UniversitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    startTransition(async () => {
      const data = await searchUniversitiesAction(query);
      setResults(data);
    });
  }, [query]);

  const handleSelect = (university: University) => {
    router.push(`/${university.id}`);
  };

  return (
    <div className="w-full max-w-2xl relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="大学名を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {isFocused && query && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isPending && (
            <div className="px-4 py-3 text-sm text-gray-500">検索中...</div>
          )}
          {!isPending && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              該当する大学が見つかりませんでした
            </div>
          )}
          {results.map((university) => (
            <button
              key={university.id}
              onClick={() => handleSelect(university)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{university.name}</div>
              {university.domain && (
                <div className="text-sm text-gray-500">{university.domain}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


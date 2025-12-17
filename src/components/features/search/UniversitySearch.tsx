
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { University } from "@/types";
import { getUniversitiesAction } from "@/server/actions/university";
import { JapanMap } from "./JapanMap";

export function UniversitySearch() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);

    const [allUniversities, setAllUniversities] = useState<University[]>([]);
    const [results, setResults] = useState<University[]>([]);
    const [, startTransition] = useTransition();

    // Load initial data
    useEffect(() => {
        startTransition(async () => {
            const data = await getUniversitiesAction();
            setAllUniversities(data);
            setResults(data); // Initial show all
        });
    }, []);

    // Filter logic: Combine Prefecture AND Text Query
    useEffect(() => {
        let filtered = allUniversities;

        // Filter by Prefecture
        if (selectedPrefecture) {
            filtered = filtered.filter(u => u.prefecture === selectedPrefecture);
        }

        // Filter by Text Query
        if (query) {
            const lowerQ = query.toLowerCase();
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(lowerQ)
            );
        }

        setResults(filtered);
    }, [query, selectedPrefecture, allUniversities]);

    const handleSelect = (university: University) => {
        router.push(`/${university.id}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">

            {/* 1. Map Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    エリアを選択
                </h2>
                <div className="max-w-2xl mx-auto">
                    <JapanMap
                        selectedPrefecture={selectedPrefecture}
                        onSelectPrefecture={setSelectedPrefecture}
                    />
                </div>
                {selectedPrefecture && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setSelectedPrefecture(null)}
                            className="text-sm text-gray-500 hover:text-red-500 underline"
                        >
                            {selectedPrefecture}の選択を解除
                        </button>
                    </div>
                )}
            </section>

            {/* 2. Text Search Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        大学名を検索
                        {selectedPrefecture && <span className="text-sm font-normal text-gray-500">({selectedPrefecture}内)</span>}
                    </h2>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={selectedPrefecture ? `${selectedPrefecture}の大学を検索...` : "大学名を入力..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-100 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </section>

            {/* 3. Results Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-gray-700">検索結果</h2>
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{results.length}件</span>
                    </div>

                    {(query || selectedPrefecture) && (
                        <button
                            onClick={() => {
                                setQuery("");
                                setSelectedPrefecture(null);
                            }}
                            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                        >
                            条件クリア
                        </button>
                    )}
                </div>
                <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                    {results.length > 0 ? (
                        results.map((university) => (
                            <button
                                key={university.id}
                                onClick={() => handleSelect(university)}
                                className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors flex justify-between items-center group"
                            >
                                <div>
                                    <div className="font-bold text-gray-900 group-hover:text-blue-700 text-lg transition-colors">{university.name}</div>
                                    <div className="flex gap-2 mt-1">
                                        {/* Domain display removed */}
                                    </div>
                                </div>
                                {university.prefecture && (
                                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                        {university.prefecture}
                                    </span>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            条件に一致する大学は見つかりませんでした
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

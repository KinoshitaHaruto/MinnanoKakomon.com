
import Link from "next/link";
import { auth } from "@/auth";
import { getUniversityById } from "@/server/db/university";
import { JoinButton } from "@/components/features/university/JoinButton";

type Props = {
    universityId: string;
};

export async function UniversityDashboard({ universityId }: Props) {
    const university = await getUniversityById(universityId);
    const session = await auth();

    if (!university) {
        return <div>University not found</div>;
    }

    const isJoined = session?.user?.universityId === universityId;
    const isAuthenticated = !!session?.user;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {university.prefecture}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">{university.name}</h1>
                </div>

                {/* Unified Join/Leave Button */}
                <JoinButton
                    universityId={university.id}
                    isJoined={isJoined}
                    isAuthenticated={isAuthenticated}
                />
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left: Recent Activity / Timeline (Placeholder) */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        最新の投稿
                    </h2>
                    <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center text-gray-400">
                        まだ投稿はありません
                    </div>
                </div>

                {/* Right: Quick Links / Search */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {university.name}の講義を探す
                    </h2>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 mb-4">学部・学科から授業を検索して、過去問を投稿・閲覧できます。</p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href={`/${university.id}`} // This might need to point to faculty list if we have one, or just re-route to same page essentially. 
                                // Actually, looking at the file structure, we have [facultyId]. 
                                // We need a way to list faculties. For now, let's just make a button that effectively does nothing new or points to a faculty list page if it existed.
                                // Wait, the user said "Finding past exams is done on the lecture page".
                                // So we need to navigate users to faculties -> departments -> courses.
                                // I'll assume we list faculties on this dashboard or provide a link to them.
                                className="w-full block text-center bg-blue-50 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-100 transition-colors">
                                学部一覧を見る
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

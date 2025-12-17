import { notFound } from "next/navigation";
import { getUniversityById } from "@/server/db/university";
import { UniversityDashboard } from "@/components/features/dashboard/UniversityDashboard";

type Props = {
    params: Promise<{ universityId: string }>;
};

export default async function UniversityPage({ params }: Props) {
    const { universityId } = await params;
    const university = await getUniversityById(universityId);

    if (!university) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <UniversityDashboard universityId={universityId} />
            </div>
        </div>
    );
}

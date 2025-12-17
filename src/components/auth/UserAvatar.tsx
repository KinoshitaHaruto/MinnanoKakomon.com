
import { auth } from "@/auth"

export async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null

    return (
        <div className="flex items-center gap-2">
            {session.user.image && (
                <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                />
            )}
            <span className="text-sm font-medium text-gray-700">
                {session.user.name}
            </span>
        </div>
    )
}

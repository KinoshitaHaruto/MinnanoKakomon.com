
import Link from "next/link"
import { auth } from "@/auth"
import { SignInButton } from "@/components/auth/SignInButton"
import { SignOutButton } from "@/components/auth/SignOutButton"
import { UserAvatar } from "@/components/auth/UserAvatar"

export async function Header() {
    const session = await auth()

    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-gray-900">
                    みんなの過去問
                </Link>
                <div className="flex items-center gap-4">
                    {session?.user ? (
                        <>
                            <UserAvatar />
                            <SignOutButton />
                        </>
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </div>
        </header>
    )
}

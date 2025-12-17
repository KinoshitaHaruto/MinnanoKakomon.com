"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { joinUniversity, leaveUniversity } from "@/server/actions/user";

type Props = {
  universityId: string;
  isJoined?: boolean;
  isAuthenticated: boolean;
};

export function JoinButton({ universityId, isJoined, isAuthenticated }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    if (!isAuthenticated) {
      await signIn("google", { callbackUrl: `/${universityId}` });
      return;
    }

    startTransition(async () => {
      try {
        if (isJoined) {
          if (confirm("本当にこの大学への参加をやめますか？")) {
            await leaveUniversity();
          }
        } else {
          await joinUniversity(universityId);
        }
        router.refresh();
      } catch (error) {
        console.error("Failed to update membership:", error);
        alert("処理に失敗しました。");
      }
    });
  };

  if (isJoined) {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
      >
        {isPending ? "処理中..." : "参加をやめる"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-6 py-2 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
    >
      {isPending ? "処理中..." : "この大学に参加する"}
    </button>
  );
}

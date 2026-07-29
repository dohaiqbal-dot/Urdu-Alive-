import { useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.navigate({ to: "/" });
      } else {
        router.navigate({ to: "/" });
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-background">
      <div className="text-center">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-sm text-ink/50">Completing sign in...</p>
      </div>
    </div>
  );
}

'use client';

import NotSession from "@/components/NotSession";
import TheError from "@/components/theError";
import TheLoader from "@/components/theLoader";
import TheSession from "@/components/theSession";
import { getSession, useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export default function Home() {
  const { session, isPending, error, refetch } = useSession();
  const checkUserSession = async () => {
    const result = await getSession();
    if (result.success) {
      console.log('User session:', result.session);
    } else {
      console.log('No session or error:', result.error);
    }
  };
  useEffect(() => {
    checkUserSession();
  }, []);

  const handleRetry = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error('Failed to refetch session:', err);
    }
  };

  if (isPending) return <div><TheLoader /></div>;
  if (error) return <div><TheError error={error} handleRetry={handleRetry} /></div>;
  if (!session) return <div><NotSession /></div>;
  return (
    <div>
      <TheSession user={session.user} />
    </div>
  );
}
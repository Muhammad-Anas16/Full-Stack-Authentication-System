'use client';

import { getSession, signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {

  const router = useRouter();
  const [loading, getLoading] = useState(false);

  const { session, isPending, error, refetch } = useSession();


  const checkUserSession = async () => {
    const result = await getSession();

    if (result.success) {
      console.log('User session:', result.session);
      // Handle authenticated user
    } else {
      console.log('No session or error:', result.error);
      // Handle unauthenticated user
    }
  };
  useEffect(() => {
    checkUserSession();
  }, []);

  const signOutFunction = async () => {
    getLoading(true);
    const result = await signOut();
    if (result.success) {
      router.push("/auth/login");
      getLoading(false);
    }
  };

  // return (
  //   <div className="flex flex-col gap-2">
  //     <button
  //       onClick={() => toast.success('Success!')}
  //       className="px-4 py-2 bg-green-600 text-white rounded"
  //     >
  //       Success
  //     </button>

  //     <button
  //       onClick={() => toast.error('Error!')}
  //       className="px-4 py-2 bg-red-600 text-white rounded"
  //     >
  //       Error
  //     </button>

  //     <button
  //       onClick={() => toast.info('Pending...')}
  //       className="px-4 py-2 bg-yellow-600 text-white rounded"
  //     >
  //       Pending
  //     </button>

  //     <button
  //       onClick={signOutFunction}
  //       title="Log Out Button"
  //       className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer"
  //     >
  //       {loading ? "Signing Out..." : "Sign Out"}
  //     </button>
  //   </div>
  // );

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error.message ? "Error" : error.message}</div>;
  if (!session) return <div>Please sign in</div>;
  return (
    <div className="py-11 px-10">
      
      <button
        onClick={signOutFunction}
        title="Log Out Button"
        className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer"
      >
        {loading ? "Signing Out..." : "Sign Out"}
      </button>

      <br/>
      <br/>
      <br/>

      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={refetch}>Refresh Session</button>
    </div>
  );
}
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LandingRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="px-6 py-10">
        <p>Redirecting...</p>
      </main>
    </>
  );
}

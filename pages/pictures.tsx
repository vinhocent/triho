import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PicturesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/design");
  }, [router]);

  return null;
}

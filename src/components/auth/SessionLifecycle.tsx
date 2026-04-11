"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000;
const HEARTBEAT_ENDPOINT = "/api/auth/session/heartbeat";

export default function SessionLifecycle() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function sendHeartbeat() {
      try {
        const response = await fetch(HEARTBEAT_ENDPOINT, {
          method: "POST",
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!isMounted) {
          return;
        }

        if (response.status === 401 || response.status === 403) {
          router.replace("/login");
          router.refresh();
        }
      } catch {
        // ignore
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void sendHeartbeat();
      }
    }

    void sendHeartbeat();

    const intervalId = window.setInterval(() => {
      void sendHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  return null;
}

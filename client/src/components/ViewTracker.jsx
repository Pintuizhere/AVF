"use client";

import { useEffect, useRef } from "react";

export default function ViewTracker({ projectId }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!projectId || hasTracked.current) return;
    hasTracked.current = true;

    const trackView = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects/${projectId}/view`, {
          method: "POST"
        });
      } catch (err) {
        console.error("Failed to track project view", err);
      }
    };

    trackView();
  }, [projectId]);

  return null; // This component doesn't render anything
}

"use client";

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Route 1</h1>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </button>
    </div>
  );
}

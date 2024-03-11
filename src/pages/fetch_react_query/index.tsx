"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function getTime() {
  return fetch("/api/time").then((res) => res.json());
}
export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["data"],
    queryFn: getTime,
  });
  return (
    <div className="">
      <h1>Fetch By react query</h1>
      <h1>Data: {JSON.stringify(data)}</h1>
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

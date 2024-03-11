"use client";
import { useRouter } from "next/router";
import { Data } from "../api/example_body";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<Data>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/example_body", {
          method: "POST",
          body: JSON.stringify({ name: "John", age: 30 }),
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
      <p>
        {data?.name} and {data?.age}
      </p>
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

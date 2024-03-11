"use client";
import useSWR, { mutate } from "swr";
import { Data } from "../api/example_body";
import router from "next/router";

const fetcher = (url: string | URL | Request, data: Data) =>
  fetch(url, { method: "POST", body: JSON.stringify(data) }).then((r) =>
    r.json()
  );
const fetcherGet = (url: string | URL | Request) =>
  fetch(url, { method: "GET" }).then((r) => r.json());

export default function Profile() {
  const { data: example_body, error: example_body_error } = useSWR(
    "/api/example_body",
    (url) => fetcher(url, { name: "John", age: 222 })
  );
  const { data, error } = useSWR("/api/time", fetcherGet);

  return (
    <div>
      <h1>Data: {JSON.stringify(example_body)}</h1>
      <button onClick={() => mutate("/api/example_body")}>mutate</button>
      <h1>Time: {JSON.stringify(data)}</h1>
      <button onClick={() => mutate("/api/time")}> time update</button>
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

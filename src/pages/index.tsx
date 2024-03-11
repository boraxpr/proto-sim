import { trpc } from "@/utils/trpc";

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: "client" });
  const admin = trpc.admin.secret.useQuery({ text: "admin" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <p>{admin.data?.secret}</p>
    </div>
  );
}

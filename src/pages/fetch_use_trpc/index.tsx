import { trpc } from "@/utils/trpc";

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: "client" });
  const admin = trpc.admin.secret.useQuery({ text: "admin" });
  const users = trpc.user.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <p>{admin.data?.secret}</p>
      <p>{JSON.stringify(users.data)}</p>
    </div>
  );
}
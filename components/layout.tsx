import SideMenu from "./side";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Example /> */}
      <div className="grid grid-rows-[1fr,24fr] w-screen h-screen">
        {/* <SideMenu />
         */}

        <div className="p-24">{children}</div>
      </div>
    </>
  );
}

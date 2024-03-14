import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import SideMenu from "./side";

export default function Layout({ children }) {
  return (
    <div>
      <div className="flex flex-col justify-evenly">
        <SideMenu />
        <Link href="/">HOME</Link>
        <Link href="/fetch_react_query">REACT-QUERY</Link>
        <Link href="/fetch_use_effect">REACT-USE-EFFECT</Link>
        <Link href="/fetch_use_swr">REACT-USE-SWR</Link>
        <Link href="/fetch_use_trpc">REACT-USE-TRPC</Link>
        <Link href="/cropper">REACT_EZ_CROP</Link>
      </div>
      {children}
    </div>
  );
}

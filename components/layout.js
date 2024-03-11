import Link from "next/link";
export default function Layout({ children }) {
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <Link href="/">HOME</Link>
        <Link href="/fetch_react_query">REACT-QUERY</Link>
        <Link href="/fetch_use_effect">REACT-USE-EFFECT</Link>
        <Link href="/fetch_use_swr">REACT-USE-SWR</Link>
        <Link href="/cropper">REACT_EZ_CROP</Link>
      </div>

      {children}
    </div>
  );
}

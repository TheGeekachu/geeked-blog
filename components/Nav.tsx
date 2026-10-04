"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="logo">thegeekachu</Link>
      
      <div className="nav-links">
        <Link href="/" className={pathname === "/" ? "active-pill" : ""}>Home</Link>
        <Link href="/blogs" className={pathname.startsWith("/blogs") ? "active-pill" : ""}>Blogs</Link>
        <Link href="/post" className={pathname === "/post" ? "active-pill" : ""}>Post</Link>
        <Link href="/signin" className={pathname === "/signin" ? "active-pill" : ""}>Sign In</Link>
      </div>
    </nav>
  );
}

export default Nav;
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderNavBar() {
  return (
    <div className="flex items-center justify-between p-2 shadow-md">
      <div className="flex gap-7 items-center">
        <Link href={"/"}>
          <Image
            src="/nde.svg"
            alt="LOD Exlorer"
            width={50}
            height={50}
            priority
          />
        </Link>
        <Link href={"/"}>
          <h2>LOD Explorer</h2>
        </Link>
      </div>
    </div>
  );
}

export default HeaderNavBar;

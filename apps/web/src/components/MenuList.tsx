"use client";

import Image from "next/image";

export default function MenuList() {
  return (
    <div>
      <button>
        <Image src="/menu.svg" alt="Menu" width={27} height={11} />
      </button>
    </div>
  );
}

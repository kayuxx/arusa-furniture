"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
const BagDialog = dynamic(() => import("./BagDialog"));

// Moving BagDialog to a separate file for better code optimization with next/dynamic
export default function Bag() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const refDialog = useRef<HTMLDialogElement>(null);

  const t = useTranslations("header.navbar.bag");
  function dialogAction() {
    if (isDialogOpen) {
      refDialog.current?.close();
      setIsDialogOpen(false);
    } else {
      refDialog.current?.show();
      setIsDialogOpen(true);
    }
  }

  return (
    <div className="flex gap-2 items-center relative">
      <button onClick={dialogAction}>{t("title")}</button>
      <BagProductsLength />
      {isDialogOpen && <BagDialog refDialog={refDialog} />}
    </div>
  );
}

type BagProductsLengthType = {
  length?: number | string;
};

function BagProductsLength({ length = 0 }: BagProductsLengthType) {
  return <div className="bg-opal py-1 px-2 rounded-full">{length}</div>;
}

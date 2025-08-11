"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import getBagProducts from "@/actions/getBagProducts";
import { useEffect } from "react";
import { getProductById } from "@/actions/getProductById";
import { list } from "@vercel/blob";
import { getVercelBlob } from "@/actions/getVercelBlob";
const BagDialog = dynamic(() => import("./BagDialog"));

// Moving BagDialog to a separate file for better code optimization with next/dynamic
export default function Bag() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const refDialog = useRef<HTMLDialogElement>(null);
  const id = "6807769c-657f-45b7-8a9c-c607c3740580";
  useEffect(() => {
    async function da() {
      const d = await getBagProducts(id);
      const di = await getProductById("2");
      const da = await Promise.all(di);
      const url = await getVercelBlob(da[0].heroImage.filename);

      console.log({ d, da, url });
    }
    da();
  }, []);
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
      {/* {isDialogOpen && <BagDialog refDialog={refDialog} />} */}
    </div>
  );
}

type BagProductsLengthType = {
  length?: number | string;
};

function BagProductsLength({ length = 0 }: BagProductsLengthType) {
  return <div className="bg-opal py-1 px-2 rounded-full">{length}</div>;
}

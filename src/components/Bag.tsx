"use client";

import { formatPrice } from "@/utils/formatting";
import { isRtl } from "@/utils/i18n";
import { Minus, Plus, X } from "@deemlol/next-icons";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Bag() {
  const [openDialog, setOpenDialog] = useState(false);

  const t = useTranslations("header.navbar.bag");
  return (
    <div className="flex gap-2 items-center relative">
      <button>{t("title")}</button>
      <BagDialog t={t} />
      <BagProductsLength />
    </div>
  );
}

type BagProductsLengthType = {
  length?: number;
};

function BagProductsLength({ length = 0 }: BagProductsLengthType) {
  return <div className="bg-opal py-1 px-2 rounded-full">{length}</div>;
}

type BagDialogType = {
  t: (n: string) => string;
};
function BagDialog({ t }: BagDialogType) {
  const locale = useLocale();

  return (
    <dialog
      open
      className={`px-3 border absolute w-100 bottom-0 translate-y-full left-0 bg-white ${isRtl(locale) ? "mr-auto" : "ml-auto"} min-h-70`}
    >
      <span className="text-stormy typo-sm mb-3">{t("dialog.title")}</span>
      <SingleBagProduct />
    </dialog>
  );
}

function SingleBagProduct() {
  return (
    <div className="flex gap-5">
      <div>
        <Image
          className="max-w-full rounded-lg"
          src="/chair.png"
          width={100}
          height={100}
          alt="NATIVE LIGHT CHAIR"
        />
      </div>
      <div className="text-stormy text-sm flex flex-col justify-between flex-1">
        <span className="font-reck ">Native Light Chair</span>
        <span>SIZE: 100 x 100</span>
        <div className="absolute right-0 top-0">
          <X />
        </div>
        <PriceAdjuster price={4999} />
      </div>
    </div>
  );
}
type PriceAdjusterProps = {
  price: number;
};

function PriceAdjuster({ price }: PriceAdjusterProps) {
  const [quantity, setQuanitity] = useState(1);
  // TODO: we should support different locales and currencies, since we support Arabic intl we might use DZD or other arabic currencies
  const finalPrice = formatPrice("en-US", "USD", price * quantity);

  function adjustQuantity(action: "plus" | "minus") {
    if (action === "minus" && quantity === 1) return;

    const actions = {
      plus: () => quantity + 1,
      minus: () => quantity - 1,
    };

    setQuanitity(actions[action]());
  }
  return (
    <div className="flex items-center justify-between">
      <span>{finalPrice}</span>
      <div className="flex border py-0.5 px-1 items-center justify-between w-22 rounded-sm border-oyster">
        <button>
          <Minus size={15} onClick={() => adjustQuantity("minus")} />
        </button>
        <span>{quantity}</span>
        <button>
          <Plus size={15} onClick={() => adjustQuantity("plus")} />
        </button>
      </div>
    </div>
  );
}

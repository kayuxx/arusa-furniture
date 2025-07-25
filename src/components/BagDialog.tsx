import { getProduct } from "@/sanity/getProduct";
import { urlFor } from "@/sanity/sanityImageUrl";
import { Price, Product } from "@/types/sanity";
import { Unarray } from "@/types/utils";
import { formatPrice } from "@/utils/formatting";
import { isRtl } from "@/utils/i18n";
import { Minus, Plus, X } from "@deemlol/next-icons";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useQueries } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { RefObject, useState } from "react";

type BagDialogType = {
  t: (n: string) => string;
  ids: string[];
  refDialog: RefObject<HTMLDialogElement | null>;
};

export default function BagDialog({ t, ids, refDialog }: BagDialogType) {
  // TODO-TODAY: implement dialog open and close and remove item from the bag (zutstand related)
  const locale = useLocale();

  const manyQueries = ids.map((e) => ({
    queryKey: ["bag-products"],
    queryFn: () => getProduct(e),
  }));

  const manyData = useQueries({
    queries: manyQueries,
  });

  const buildImageProp = (e: Product["image"]) => ({
    _ref: e?.asset?._ref,
  });

  return (
    <dialog
      ref={refDialog}
      open
      className={`px-3 border absolute w-100 bottom-0 translate-y-full left-0 bg-white ${isRtl(locale) ? "mr-auto" : "ml-auto"} min-h-70`}
    >
      <span className="text-stormy typo-sm my-2">{t("dialog.title")}</span>
      {manyData.map((e, ind) => {
        if (e.isLoading) return <div key={ind}>Loading...</div>;
        if (!e.data) throw Error("Product is not exist in database");
        // usd price is required on sanity, it shouldn't be undefined or null
        const usdPrice = e.data.price.find((e) => e.currency === "usd")!;
        // the prefered currency, if not exist then fallback to the usd price
        // TODO: user preference or based on user geo location
        const preferedPrice = e.data.price.find((e) => e.currency === "dzd"); // dzd, sar, etc..

        return (
          <SingleBagProduct
            key={ind}
            productName={e.data.name}
            productPrice={preferedPrice || usdPrice}
            productImage={buildImageProp(e.data?.image)}
            productSize={e.data.dimensions}
            t={t}
          />
        );
      })}
    </dialog>
  );
}

type SingleBagProductProps = {
  productName: string;
  productSize: string;
  productPrice: Unarray<Price>;
  productImage: SanityImageSource;
  t: (n: string) => string;
};

function SingleBagProduct({
  productName,
  productPrice,
  productSize,
  productImage,
  t,
}: SingleBagProductProps) {
  const imageUrl = urlFor(productImage)
    .width(100)
    .height(100)
    .quality(75)
    .url();

  return (
    <div className="flex gap-5">
      <div>
        <Image
          className="max-w-full rounded-lg"
          src={imageUrl}
          width={100}
          height={100}
          alt={productName}
        />
      </div>
      <div className="text-stormy text-sm flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between">
          <span className="">{productName}</span>
          <button>
            <X size={15} />
          </button>
        </div>
        <span>
          {t("dialog.product.size")}:{" "}
          <span className="inline!" dir="ltr">
            {productSize}
          </span>
        </span>
        <PriceAdjuster
          price={productPrice.amount}
          currency={productPrice.currency}
        />
      </div>
    </div>
  );
}

type PriceAdjusterProps = {
  price: number;
  currency: string;
};

function PriceAdjuster({ price, currency }: PriceAdjusterProps) {
  // TODO: quantity should be replaced with zutstand state
  const [quantity, setQuanitity] = useState(1);
  const finalPrice = formatPrice(currency, price * quantity);

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

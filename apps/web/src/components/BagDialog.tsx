"use client";
import getBagProducts from "@/actions/getBagProducts";
import { getProduct } from "@/sanity/getProduct";
import { urlFor } from "@/sanity/sanityImageUrl";
import { Price, Product } from "@/types/sanity";
import { Unarray } from "@/types/utils";
import { formatPrice } from "@/utils/formatting";
import { isRtl } from "@/utils/i18n";
import { Minus, Plus, X } from "@deemlol/next-icons";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { RefObject, useState } from "react";

type BagDialogType = {
  // ids: string[];
  refDialog: RefObject<HTMLDialogElement | null>;
};

export default function BagDialog({ refDialog }: BagDialogType) {
  const t = useTranslations("header.navbar.bag");
  // TODO-TODAY: implement dialog open and close and remove item from the bag (zutstand related)
  const locale = useLocale();
  const user_id = "ff80a01e-eb1c-4ff8-8720-5f0f29d64777";
  const { data: bagProducts, ...bag } = useQuery({
    queryKey: ["bagProducts"],
    queryFn: () => getBagProducts(user_id),
    // staleTime: Infinity,
  });

  const manyData = useQueries({
    queries: bagProducts
      ? bagProducts.map(({ productId }) => ({
          queryKey: ["bag-product", productId],
          queryFn: () => getProduct(productId),
        }))
      : [],
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
      {bag.isLoading && <h1>Fetching Bags</h1>}
      {manyData.map((product, ind) => {
        if (product.isLoading) return <h1 key={ind}>Loading...</h1>;

        if (!product.data || !bagProducts)
          throw Error("Product is not exist in database");
        // usd price is required on sanity, it shouldn't be undefined or null
        const usdPrice = product.data.price.find((e) => e.currency === "usd")!;
        // the prefered currency, if not exist then fallback to the usd price
        // TODO: user preference or based on user geo location
        const preferedPrice = product.data.price.find(
          (e) => e.currency === "dzd",
        ); // dzd, sar, etc..

        return (
          <SingleBagProduct
            key={ind}
            productName={product.data.name}
            productPrice={preferedPrice || usdPrice}
            productImage={buildImageProp(product.data?.image)}
            productSize={product.data.dimensions}
            productMetaQuantity={bagProducts[ind].quantity}
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
  productMetaQuantity: number;
  t: (n: string) => string;
};

function SingleBagProduct({
  productName,
  productPrice,
  productSize,
  productImage,
  productMetaQuantity,
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
        <div className="flex items-center justify-between relative">
          <span className="">{productName}</span>
          <button className="left-0 absolute p-2 hover:rounded-full hover:border hover:border-oyster">
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
          productMetaQuantity={productMetaQuantity}
        />
      </div>
    </div>
  );
}

type PriceAdjusterProps = {
  price: number;
  currency: string;
  productMetaQuantity: number;
};

function PriceAdjuster({
  price,
  currency,
  productMetaQuantity,
}: PriceAdjusterProps) {
  // TODO: quantity should be replaced with zutstand state
  const [quantity, setQuanitity] = useState(productMetaQuantity);
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

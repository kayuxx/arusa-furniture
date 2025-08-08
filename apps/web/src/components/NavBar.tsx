import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Bag from "./Bag";
import MenuList from "./MenuList";
import { getTranslations } from "next-intl/server";
import { BagStoreProvider } from "@/providers/BagStoreProvider";
import BagDialog from "./BagDialog";
import { tfuckin } from "@/actions/t";
// import getBagProducts from "@/actions/getBagProducts";

export default async function NavBar() {
  const t = await getTranslations("header.navbar");
  // const data = await getBagProducts("ff80a01e-eb1c-4ff8-8720-5f0f29d64777");
  // console.log({ data });
  return (
    <nav className="flex justify-between bg-black py-20 items-center typo-xs">
      <div className="flex gap-4 items-center">
        <MenuList />
        <Link href="/shop">{t("shop.title")}</Link>
      </div>
      <div>
        <Image src="/Logo.svg" alt="Logo" width={119} height={20} />
      </div>
      <div>
        <BagStoreProvider>
          <Bag />
        </BagStoreProvider>
      </div>
    </nav>
  );
}

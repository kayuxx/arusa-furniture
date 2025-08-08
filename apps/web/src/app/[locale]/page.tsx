import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div className="">
      <h1>{t("greetings")}</h1>
    </div>
  );
}

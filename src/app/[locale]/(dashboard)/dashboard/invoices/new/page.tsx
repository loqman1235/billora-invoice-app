import { CreateInvoiceForm } from "@/app/[locale]/(dashboard)/_components/create-invoice-form";
import { GoBackButton } from "@/components/global/go-back-button";
import { getTranslations } from "next-intl/server";

const CreateInvoicePage = async () => {
  const t = await getTranslations("DashboardPage.invoices.create");
  return (
    <div className="mx-auto my-5 max-w-screen-sm px-5">
      <GoBackButton />
      <div className="mb-5 flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold">{t("title")}</h2>
      </div>

      {/* TODO: CREATE FORM */}
      <CreateInvoiceForm />
    </div>
  );
};
export default CreateInvoicePage;

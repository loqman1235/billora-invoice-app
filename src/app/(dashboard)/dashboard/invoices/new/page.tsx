import { CreateInvoiceForm } from "@/app/(dashboard)/_components/create-invoice-form";

const CreateInvoicePage = () => {
  return (
    <div className="mx-auto my-10 max-w-screen-sm px-5">
      <div className="mb-5 flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold">Create New Invoice</h2>
      </div>

      {/* TODO: CREATE FORM */}
      <CreateInvoiceForm />
    </div>
  );
};
export default CreateInvoicePage;

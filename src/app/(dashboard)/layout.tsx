import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] w-full">{children}</main>

      <Footer />
    </>
  );
};
export default DashboardLayout;

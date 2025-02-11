import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default LandingLayout;

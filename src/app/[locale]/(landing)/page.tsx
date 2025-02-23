import { HeroSection } from "./_components/hero";

const LandingPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return <HeroSection locale={locale} />;
};
export default LandingPage;

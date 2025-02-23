import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "../_components/sign-in-form";
import { getTranslations } from "next-intl/server";

const SignInPage = async () => {
  const t = await getTranslations("Auth");

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>{t("SignInPage.title")}</CardTitle>
        <CardDescription>{t("SignInPage.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
};
export default SignInPage;

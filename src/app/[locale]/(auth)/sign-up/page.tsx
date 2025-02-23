import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "../_components/sign-up-form";
import { getTranslations } from "next-intl/server";

const SignUpPage = async () => {
  const t = await getTranslations("Auth");
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>{t("SignUpPage.title")}</CardTitle>
        <CardDescription>{t("SignUpPage.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};
export default SignUpPage;

import { Card, CardContent } from "@/components/ui/card";
import { VerifyEmailForm } from "../_components/verify-email-form";

const VerifyEmailPage = () => {
  return (
    <Card className="min-w-[400px]">
      <CardContent>
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
};
export default VerifyEmailPage;

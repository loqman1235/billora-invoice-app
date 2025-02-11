import { googleSignInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleButton = () => {
  return (
    <Button
      onClick={async () => await googleSignInAction()}
      type="button"
      variant="outline"
      className="w-full"
    >
      <FcGoogle className="size-4" />
      Continue with Google
    </Button>
  );
};

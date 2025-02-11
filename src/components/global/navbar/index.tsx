import Link from "next/link";
import { Brand } from "../brand";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { UserAvatar } from "../user-avatar";

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="h-16 w-full">
      <div className="mx-auto flex h-full w-full items-center justify-between px-5 md:max-w-screen-2xl md:px-10">
        <Brand />

        {session?.user ? (
          <UserAvatar
            name={session.user.name ?? ""}
            image={session.user.image ?? ""}
            email={session.user.email ?? ""}
          />
        ) : (
          <ul className="flex h-full items-center gap-5">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/sign-in">Get Started</Link>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

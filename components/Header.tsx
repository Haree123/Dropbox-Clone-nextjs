import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./Theme-Toggler";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-[#0160FE]">
            <Image
              className="invert"
              src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
              alt="Img"
              height={50}
              width={50}
              loading="lazy"
            />
          </div>
          <Link href="/" className="font-bold text-xl">
            Dropbox
          </Link>
        </div>

        <div className="flex px-2 items-center space-x-4">
          <ThemeToggler />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;

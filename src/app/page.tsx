"use client";

import styles from "../styles/home.module.css";
import clsx from "clsx";
import Image from "next/image";
import Logo from "../../public/logo/fulllogo_transparent_nobuffer.png";
import TextLogo from "../../public/logo/textonly_nobuffer.png";
import { SignInButton, SignUp, SignedIn, useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { LogIn, Check, Info } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  <>
    {isSignedIn ? (
      router.push("/dashboard")
    ) : (
      <main>
        <div className="relative flex">
          <div className="flex h-screen w-1/2 flex-col justify-center p-24">
            <Badge
              variant="outline"
              className="mb-6 self-start bg-green-600 text-gray-50"
            >
              Free Signup
            </Badge>
            <Image src={TextLogo} width={400} alt="TNNS Coach" />
            <h5 className="text-md text-jusitfy my-6 text-gray-700">
              Elevate your coaching game with our comprehensive web app designed
              to streamline match organization and administrative tasks,
              empowering tennis coaches to focus on what they do best - guiding
              players to victory.
            </h5>
            <div className="mb-6 flex gap-6">
              <Badge variant="secondary">
                <Check className="mr-2 text-green-600" size={20} /> HS or
                college level
              </Badge>
              <Badge variant="secondary">
                <Check className="mr-2 text-green-600" size={20} /> No credit
                card required
              </Badge>
              <Badge variant="secondary">
                <Check className="mr-2 text-green-600" size={20} /> Easy to use
              </Badge>
            </div>
            <div className="flex gap-6">
              <SignInButton mode="modal">
                <Button variant="default" size="lg">
                  Sign In <LogIn size={20} className="ml-2" />
                </Button>
              </SignInButton>
              <Button variant="outline" size="lg">
                <Info size={20} className="mr-2" /> Learn More
              </Button>
            </div>
          </div>
          <div className="absolute left-[2rem] top-[1rem]">
            <Image src={Logo} alt="TNNS Coach Logo" width={100} />
          </div>
          <div
            className={clsx(
              "flex h-screen w-1/2 items-center justify-center",
              styles.bgImg,
            )}
          >
            <SignUp routing="hash" />
          </div>
        </div>
      </main>
    )}
  </>;
}

"use client";

import styles from "../styles/home.module.css";
import clsx from "clsx";
import Image from "next/image";
import Logo from "../../public/logo/fulllogo_transparent_nobuffer.png";
import TextLogo from "../../public/logo/textonly_nobuffer.png";
import { SignInButton, SignUp, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { LogIn, Check, Info, UserPlus } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  console.log(isSignedIn);

  const renderPage = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
    return (
      <main>
        <div className="w-full bg-gray-50">
          <div className="mx-auto flex h-screen w-2/6 flex-col items-center justify-center">
            <Image src={Logo} alt="TNNS Coach Text Logo" width={250} />
            <h6 className="my-6 text-center text-lg text-gray-700">
              Elevate your coaching game with streamlined match organization and
              admin tasks, empowering tennis coaches to focus on what they do
              best -{" "}
              <span className="font-bold tracking-wide">
                guiding players to victory
              </span>
              .
            </h6>
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
              <SignUpButton mode="modal">
                <Button variant="brand" size="lg">
                  <UserPlus size={20} className="mr-2" /> Sign Up
                </Button>
              </SignUpButton>
              <Button variant="ghost" size="lg">
                Learn More <Info size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return <>{renderPage()}</>;
}

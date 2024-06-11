"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Container } from "./Container";


const Navbar = () => {
  return (
    <Container className="sticky top-0 z-50 bg-white" variant={"breakpointPadded"}>
    <div className="w-full">
        <div className="pt-5 max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
            <div className="flex">
                <Link href={"/"} className="flex gap-1 items-center text-2xl">
                    <h1 className="text-dark font-bold">
                        TCFP-Quizzes
                    </h1>
                    <MdQuiz className="text-primary" />
                </Link>
                <NavigationMenu>
                    <div className="ml-12">
                        <Link href="/module" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Modules
                            </NavigationMenuLink>
                        </Link>
                    </div>
                    <div className="ml-12">
                        <Link href="/quiz" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Quizzes
                            </NavigationMenuLink>
                        </Link>
                    </div>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-3 justify-end">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    </div>
</Container>

  )
}

export default Navbar
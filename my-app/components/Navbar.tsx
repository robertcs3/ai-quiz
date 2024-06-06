"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const Navbar = () => {
  return (
    <div className="pt-5 w-full">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
        <div className="flex">
          <Link
            href={"/"}
            className="flex gap-1 items-center text-2xl"
          >
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
  )
}

export default Navbar
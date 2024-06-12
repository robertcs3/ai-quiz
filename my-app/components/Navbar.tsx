"use client";
import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Container } from "./Container";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center justify-between w-80">
                        <div className="text-sm font-medium leading-none pl-4">{title}</div>
                        <p className="text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </a>
            </NavigationMenuLink>
        </li>

    )
})
ListItem.displayName = "ListItem"
const Navbar = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [quizResults, setQuizResults] = useState([]);
    
    const [data, setData] = useState(null);

  

    const components: { title: string; href: string; score: number; }[] = [
        {
            title: "Threats to AI Chatbots",
            href: "/quiz/1",
            score: 0,
        },
        {
            title: "What is AI?",
            href: '/quiz/2',
            score: 0,
        }
    ]
    return (
        <Container className="sticky top-0 z-50 bg-white" variant={"breakpointPadded"}>
            <div className="w-full">
                <div className="pt-5 max-w-[1500px] mx-auto flex justify-between items-center border-b pb-5">
                    <div className="flex">
                        <Link href={"/"} className="flex gap-1 items-center text-2xl">
                            <h1 className="text-dark font-bold">
                                TCFP-Quizzes
                            </h1>
                            <MdQuiz className="text-primary" />
                        </Link>
                        <NavigationMenu>
                            <NavigationMenuList className="lg:px-12 lg:gap-3">
                                <NavigationMenuItem>
                                    <Link href="/module" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            <div className="pl-4">Modules</div>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Quizzes</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.href}
                                                >
                                                    {component.score}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <SignedOut>
                            <Button size={"sm"} variant={'ghost'}><SignInButton /></Button>
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
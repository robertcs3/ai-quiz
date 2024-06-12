import React from "react";
import Link from 'next/link'
import { Card } from "@/components/ui/card";

const page = () => {
 
  return (
    <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-center"> 
      <Link href='/quiz/1'>AI Chatbot Basics</Link>
      <Link href='/quiz/2'>What is Artificial Intelligence?</Link>
      
    </section>
   
  );
};

export default page;
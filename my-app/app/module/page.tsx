"use client";
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from '@/components/Container';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleReadMoreClick = () => {
    setTimeout(() => {
      setIsLoading(true);
      router.push('/module/1');
    }, 250);
  };


  return (
    <Container variant={"breakpointPadded"}>
      <section className="relative w-full min-h-[500px] flex items-start justify-center gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Threats to AI Chatbots</CardTitle>
            <CardDescription>An introduction to the fundamental principles and practices for ensuring the security and privacy of AI-driven chatbots.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible>
              <AccordionItem value="item-1">
              <AccordionTrigger className='flex justify-center'>
                <div className='px-6'>Table of contents</div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4">
                  <li>Intellectual Property Uncertainty</li>
                  <li>AI Platform Vulnerabilities</li>
                  <li>Regulatory Uncertainty</li>
                  <li>Misinformation, Hallucinations, & Biases</li>
                  <li>Data Leaks</li>
                </ul>
              </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter >
            <div className='pt-6'>
              <Button size="sm" isLoading={isLoading} onClick={handleReadMoreClick}>
                Read More
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </Container>
  )
}

export default Page;

import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-start justify-center gap-12"> 
      <Card>
  <CardHeader>
    <CardTitle>Threats to AI Chatbots</CardTitle>
    <CardDescription>An introduction to the fundamental principles and practices for ensuring the security and privacy of AI-driven chatbots.</CardDescription>
  </CardHeader>
  <CardContent>
    <li>Intellectual Property Uncertainty</li>
    <li>AI Platform Vulnerabilities</li>
    <li>Regulatory Uncertainty</li>
    <li>Misinformation, Hallucinations, & Biases</li>
    <li>Data Leaks</li>
  </CardContent>
  <CardFooter className='flex justify-end'>
          <Button size ={'sm'} asChild>
            <Link href="/module/1">Read More</Link>
          </Button>
        </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle>What is AI?</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

    </section>
    
  )
}

export default page
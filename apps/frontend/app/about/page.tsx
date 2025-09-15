"use client";
import Image from "next/image";
import { useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function AboutPage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Hi! I&apos;m Ishaan Jain</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Final-year CS student building practical, scalable, and user-centric applications.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => scrollTo("my-story-section")}>My Story</Button>
              <Button variant="outline" onClick={() => scrollTo("contact-section")}>Get in Touch</Button>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section id="my-story-section" className="scroll-mt-20">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>My Story</CardTitle>
              <CardDescription>A little about my background and motivation</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                  <Image src="/Profile_picture.jpg" alt="Ishaan Jain" fill className="object-cover" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Hi, I&apos;m Ishaan Jain, the creator of this Mini CRM platform. I&apos;m a final-year computer science student driven by a core curiosity: understanding how things work, and then figuring out how to make them work better.
                  My journey in tech is mirrored by a life of constant movement. Growing up across India and Malaysia—from Kochi to Kuala Lumpur—taught me adaptability and the value of embracing new perspectives. These experiences have shaped my approach to software development, where I enjoy navigating new challenges and learning diverse technologies. Settling in Bangalore for the last eight years has finally given me a place to call home.
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  This drive isn&apos;t new. From competing in interschool tech events and CBSE meets during my school years to the discipline I find in swimming and running, I&apos;ve always been passionate about persistence and focused problem-solving. Outside of coding, you can find me exploring the intricate worlds of Christopher Nolan films (especially Interstellar) or diving into the latest anime.
                  I built this project to put theory into practice and tackle real-world challenges like the ones Xeno is solving. I&apos;m excited about opportunities where I can contribute to building scalable, intelligent, and user-centric applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-section" className="scroll-mt-20">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Send me a message — I usually respond quickly</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Web3Forms embed */}
              <form action="https://api.web3forms.com/submit" method="POST" className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="access_key" value="abe74d01-11f5-4c44-adfa-7d23b8341043" />
                <input type="hidden" name="subject" value="New message from Xeno Mini CRM" />
                <input type="hidden" name="from_name" value="Xeno CRM Contact" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input name="name" required className="w-full rounded-md border bg-background px-3 py-2 outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input name="email" type="email" required className="w-full rounded-md border bg-background px-3 py-2 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea name="message" rows={5} required className="w-full rounded-md border bg-background px-3 py-2 outline-none" />
                </div>
                <input type="hidden" name="redirect" value="/about?success=true" />
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </div>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">Emails go to: ishaanjain0902@gmail.com via Web3Forms.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

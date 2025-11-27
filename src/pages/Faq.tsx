"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {/* 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              What is Hillypix?
            </AccordionTrigger>
            <AccordionContent>
              Hillypix is a North-East OTT streaming platform that showcases
              movies, songs, and web series based on North-East Indian culture.
              Enjoy unlimited streaming without ads, with new content added
              every week.
            </AccordionContent>
          </AccordionItem>

          {/* 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">
              How much does Hillypix cost?
            </AccordionTrigger>
            <AccordionContent>
              Watch Hillypix on any device with a simple monthly plan.  
              Plans range from <strong>₹99/month</strong> to <strong>₹499/month</strong>.
              Annual plans start at <strong>₹999/year</strong>.  
              No hidden charges, no contracts.
            </AccordionContent>
          </AccordionItem>

          {/* 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">
              Where can I watch?
            </AccordionTrigger>
            <AccordionContent>
              You can watch on hillypix.com or any device that supports the
              Hillypix app including Smart TVs, smartphones, tablets, and gaming
              consoles. Download shows on iOS/Android to watch offline anytime.
            </AccordionContent>
          </AccordionItem>

          {/* 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">
              How do I cancel?
            </AccordionTrigger>
            <AccordionContent>
              Hillypix is completely flexible. There are no contracts. Cancel
              anytime with just a few clicks — no cancellation fees.
            </AccordionContent>
          </AccordionItem>

          {/* 5 */}
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">
              What can I watch on Hillypix?
            </AccordionTrigger>
            <AccordionContent>
              Hillypix offers a wide library of North-East movies, music, and
              web series. Watch unlimited content anytime you want.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Footer />
    </div>
  );
}

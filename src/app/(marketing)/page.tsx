"use client";

import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { StickyAppointmentButton } from "@/components/home/sticky-appointment-button";
import { ServicesPreview } from "@/components/home/services-preview";

import { BeforeAfterGallery } from "@/components/services/before-after-gallery";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-0 relative">
      <Hero />
      <Introduction />
      <ServicesPreview />
      <BeforeAfterGallery />
      <StickyAppointmentButton />
    </div>
  );
}

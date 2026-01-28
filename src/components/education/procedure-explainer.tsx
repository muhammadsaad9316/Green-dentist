"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Microscope, ShieldCheck, Sparkles, Syringe } from "lucide-react"; import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/lib/images";

// Mock Data for Interactive Diagrams
const procedures = {
    rootcanal: {
        id: "rootcanal",
        title: "Root Canal Therapy",
        icon: Microscope,
        steps: [
            {
                title: "Infection Removal",
                desc: "The infected pulp is carefully removed from inside the tooth.",
                image: images.procedures.checkup // Placeholder
            },
            {
                title: "Cleaning & Shaping",
                desc: "The nerve canal is cleaned, disinfected, and shaped.",
                image: images.procedures.tools
            },
            {
                title: "Sealing",
                desc: "A biocompatible material fills the canal to prevent reinfection.",
                image: images.procedures.implants
            },
            {
                title: "Restoration",
                desc: "A crown is placed to restore the tooth's strength and function.",
                image: images.procedures.whitening
            }
        ]
    },
    implant: {
        id: "implant",
        title: "Dental Implant",
        icon: ShieldCheck,
        steps: [
            { title: "Placement", desc: "The titanium post is surgically placed into the jawbone.", image: images.procedures.implants },
            { title: "Osseointegration", desc: "Healing period where bone fuses with the implant.", image: images.hero },
            { title: "Abutment", desc: "A connector is attached to the implant post.", image: images.procedures.tools },
            { title: "Crown", desc: "Custom-made tooth is attached for a natural look.", image: images.people.womanSmile }
        ]
    },
    veneers: {
        id: "veneers",
        title: "Porcelain Veneers",
        icon: Sparkles,
        steps: [
            { title: "Consultation", desc: "Design your perfect smile shape and shade.", image: images.people.doctorWoman },
            { title: "Preparation", desc: "Minimal amount of enamel is removed for fit.", image: images.procedures.checkup },
            { title: "Bonding", desc: "Veneers are permanently bonded to the teeth.", image: images.procedures.whitening },
            { title: "Reveal", desc: "Instant transformation of your smile.", image: images.people.womanSmile }
        ]
    }
};

export function ProcedureExplainer() {
    const [activeProcedure, setActiveProcedure] = useState<keyof typeof procedures>("rootcanal");
    const [activeStep, setActiveStep] = useState(0);

    const currentData = procedures[activeProcedure];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold mb-4">Interactive Procedure Guide</h2>
                    <p className="text-muted-foreground">Click through to understand how common treatments work.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Navigation */}
                    <div className="lg:col-span-3 space-y-2">
                        {Object.values(procedures).map((proc) => (
                            <button
                                key={proc.id}
                                onClick={() => { setActiveProcedure(proc.id as any); setActiveStep(0); }}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeProcedure === proc.id
                                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <proc.icon size={20} />
                                {proc.title}
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-9 bg-muted/20 rounded-2xl p-6 md:p-8 border border-border">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Visual */}
                            <div className="relative aspect-[4/3] bg-background rounded-xl overflow-hidden shadow-sm border border-border/50">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${activeProcedure}-${activeStep}`}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={currentData.steps[activeStep].image}
                                            alt={currentData.steps[activeStep].title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Steps logic */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">{currentData.title}</h3>
                                    <p className="text-muted-foreground">{activeStep + 1} of {currentData.steps.length}</p>
                                </div>

                                <div className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeStep}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                        >
                                            <h4 className="text-xl font-bold mb-2 text-primary">{currentData.steps[activeStep].title}</h4>
                                            <p className="text-lg leading-relaxed text-muted-foreground">
                                                {currentData.steps[activeStep].desc}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                                        disabled={activeStep === 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={() => setActiveStep(Math.min(currentData.steps.length - 1, activeStep + 1))}
                                        disabled={activeStep === currentData.steps.length - 1}
                                    >
                                        Next Step
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-8 flex gap-2">
                            {currentData.steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= activeStep ? "bg-primary" : "bg-muted-foreground/20"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

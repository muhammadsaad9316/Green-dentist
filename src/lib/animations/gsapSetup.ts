import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins once globally
 */
let isRegistered = false;

export function registerGSAPPlugins() {
    if (!isRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        isRegistered = true;
    }
}

// Auto-register on import
registerGSAPPlugins();

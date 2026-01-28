import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ContactInfo() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                    Located in the heart of downtown, our clinic is easily accessible by public transport and has ample parking.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold">Visit Us</h3>
                            <p className="text-muted-foreground">123 Dental Avenue, Suite 100<br />New York, NY 10001</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold">Call Us</h3>
                            <p className="text-muted-foreground">(555) 123-4567</p>
                            <p className="text-xs text-muted-foreground">Mon-Fri: 8am - 6pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold">Email Us</h3>
                            <p className="text-muted-foreground">hello@moderndentist.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold">Opening Hours</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li className="flex justify-between w-40"><span>Mon - Fri:</span> <span>8:00 AM - 6:00 PM</span></li>
                                <li className="flex justify-between w-40"><span>Saturday:</span> <span>9:00 AM - 2:00 PM</span></li>
                                <li className="flex justify-between w-40"><span>Sunday:</span> <span>Closed</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden h-[300px] bg-muted relative shadow-sm border border-border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location"
                />
            </div>
        </div>
    );
}

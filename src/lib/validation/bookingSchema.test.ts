import { describe, it, expect } from 'vitest';
import { bookingFormSchema } from './bookingSchema';

describe('bookingFormSchema', () => {
    it('validates a correct booking object', () => {
        const validData = {
            serviceId: 'service-1',
            date: new Date(),
            timeSlot: '10:00 AM',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+15551234567',
            notes: 'Some notes'
        };
        const result = bookingFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('fails on invalid email', () => {
        const invalidData = {
            serviceId: 'service-1',
            date: new Date(),
            timeSlot: '10:00 AM',
            name: 'John Doe',
            email: 'not-an-email',
            phone: '+15551234567'
        };
        const result = bookingFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain('Invalid email');
        }
    });

    it('fails on invalid phone number', () => {
        const invalidData = {
            serviceId: 'service-1',
            date: new Date(),
            timeSlot: '10:00 AM',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123' // too short
        };
        const result = bookingFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});

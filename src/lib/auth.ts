import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Generate a unique confirmation number for appointments
 */
export function generateConfirmationNumber(): string {
    const prefix = 'GD'; // Green Dentist
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}

/**
 * Validate if a confirmation number has the correct format
 */
export function isValidConfirmationNumber(confirmationNumber: string): boolean {
    return /^GD-[A-Z0-9]+-[A-Z0-9]{4}$/.test(confirmationNumber);
}

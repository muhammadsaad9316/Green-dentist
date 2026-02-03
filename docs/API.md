# API Service Layer Documentation

Complete reference for the API service layer and backend integration.

---

## Overview

The API service layer provides type-safe access to backend endpoints. It's built with Axios and includes:
- **Type-safe contracts** - Full TypeScript coverage
- **Error handling** - Centralized error transformation
- **Auth management** - Token injection
- **Request/response transformation** - Convert between frontend and backend formats

---

## Configuration

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

- **Development:** Defaults to `http://localhost:3000/api`
- **Production:** Set `NEXT_PUBLIC_API_URL` to your backend URL

---

## API Client

### Base Configuration

**Location:** `/src/lib/apiClient.ts`

```typescript
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

**Features:**
- Base URL from environment
- 10-second timeout
- JSON content type
- Request/response interceptors

---

## Booking API

### Endpoints

**Location:** `/src/api/endpoints/bookings.ts`

#### `bookingsApi.create()`

Create a new booking.

**Parameters:**
```typescript
data: CreateBookingRequest
```

**Returns:**
```typescript
Promise<BookingResponse>
```

**Example:**
```typescript
import { bookingsApi, toBookingRequest } from "@/api";

const booking = await bookingsApi.create(
  toBookingRequest(formData)
);
console.log(booking.confirmationNumber);
```

---

#### `bookingsApi.getById()`

Get a booking by ID.

**Parameters:**
```typescript
id: string
```

**Returns:**
```typescript
Promise<BookingResponse>
```

**Example:**
```typescript
const booking = await bookingsApi.getById("booking123");
```

---

#### `bookingsApi.getAll()`

Get all bookings with optional filters.

**Parameters:**
```typescript
params?: {
  page?: number;
  limit?: number;
  status?: string;
}
```

**Returns:**
```typescript
Promise<GetBookingsResponse>  // { bookings: BookingResponse[], total: number }
```

**Example:**
```typescript
const { bookings, total } = await bookingsApi.getAll({
  page: 1,
  limit: 10,
  status: "confirmed"
});
```

---

#### `bookingsApi.cancel()`

Cancel a booking.

**Parameters:**
```typescript
id: string
```

**Returns:**
```typescript
Promise<BookingResponse>
```

**Example:**
```typescript
const cancelledBooking = await bookingsApi.cancel("booking123");
```

---

#### `bookingsApi.checkAvailability()`

Check if a time slot is available.

**Parameters:**
```typescript
date: string      // ISO format: "2026-01-24"
timeSlot: string  // e.g., "9:00 AM"
```

**Returns:**
```typescript
Promise<{ available: boolean }>
```

**Example:**
```typescript
const { available } = await bookingsApi.checkAvailability(
  "2026-01-24",
  "9:00 AM"
);
```

---

## Type Contracts

### CreateBookingRequest

Request body for creating a booking.

```typescript
{
  serviceId: string;        // Service ID
  date: string;             // ISO format: "2026-01-24T09:00:00.000Z"
  timeSlot: string;         // e.g., "9:00 AM"
  patientName: string;      // Full name
  patientEmail: string;     // Email address
  patientPhone: string;     // Phone number
  notes?: string;           // Optional notes
}
```

---

### BookingResponse

Response from booking endpoints.

```typescript
{
  id: string;                    // Booking ID
  confirmationNumber: string;    // e.g., "BK-123456"
  serviceId: string;             // Service ID
  serviceName: string;           // Service name
  date: string;                  // ISO format
  timeSlot: string;              // e.g., "9:00 AM"
  patientName: string;           // Patient name
  patientEmail: string;          // Patient email
  patientPhone: string;          // Patient phone
  notes?: string;                // Optional notes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}
```

---

### GetBookingsResponse

Response from list endpoint.

```typescript
{
  bookings: BookingResponse[];   // Array of bookings
  total: number;                 // Total count (for pagination)
}
```

---

## Data Transformation

### toBookingRequest()

Transform form data to API request format.

**Location:** `/src/api/types/bookings.ts`

```typescript
function toBookingRequest(formData: BookingFormValues): CreateBookingRequest
```

**Example:**
```typescript
import { toBookingRequest } from "@/api";

const formData = {
  serviceId: "checkup",
  date: new Date("2026-01-24"),
  timeSlot: "9:00 AM",
  name: "John Doe",
  email: "john@example.com",
  phone: "555-1234",
  notes: "First visit"
};

const request = toBookingRequest(formData);
// {
//   serviceId: "checkup",
//   date: "2026-01-24T00:00:00.000Z",
//   timeSlot: "9:00 AM",
//   patientName: "John Doe",
//   patientEmail: "john@example.com",
//   patientPhone: "555-1234",
//   notes: "First visit"
// }
```

---

## Error Handling

### handleApiError()

Transform API errors to user-friendly format.

**Location:** `/src/lib/errorHandler.ts`

```typescript
function handleApiError(error: unknown): ApiError
```

**Returns:**
```typescript
{
  message: string;      // User-friendly message
  code?: string;        // Error code
  status?: number;      // HTTP status
  details?: unknown;    // Additional context
}
```

**Example:**
```typescript
import { bookingsApi } from "@/api";
import { handleApiError } from "@/lib/errorHandler";

try {
  await bookingsApi.create(requestData);
} catch (error) {
  const { message, status, code } = handleApiError(error);
  
  if (status === 400) {
    console.error("Validation error:", message);
  } else if (status === 409) {
    console.error("Conflict:", message);
  } else {
    console.error("Server error:", message);
  }
}
```

---

## Authentication

### Token Management

Auth tokens are automatically injected into requests.

**How it works:**
1. Token stored in `localStorage` as `auth_token`
2. Request interceptor adds `Authorization: Bearer {token}` header
3. Response interceptor handles 401 errors

**Setting token:**
```typescript
localStorage.setItem("auth_token", "your-jwt-token");
```

**Clearing token:**
```typescript
localStorage.removeItem("auth_token");
```

---

## Backend Integration

### Step 1: Set API URL

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Step 2: Backend Implementation

Your backend must implement these endpoints:

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | `/bookings` | `CreateBookingRequest` | `BookingResponse` |
| GET | `/bookings/:id` | - | `BookingResponse` |
| GET | `/bookings` | Query params | `GetBookingsResponse` |
| PATCH | `/bookings/:id/cancel` | - | `BookingResponse` |
| GET | `/bookings/availability` | `date`, `timeSlot` | `{ available: boolean }` |

### Step 3: Match Type Contracts

Ensure your backend returns data matching `BookingResponse` interface.

### Step 4: Test

No code changes needed! Just:
1. Set `NEXT_PUBLIC_API_URL`
2. Start backend
3. App automatically uses real API

---

## Testing

### Mocking API Responses

```typescript
import { vi } from "vitest";
import { bookingsApi } from "@/api";

vi.mock("@/api", () => ({
  bookingsApi: {
    create: vi.fn().mockResolvedValue({
      id: "booking123",
      confirmationNumber: "BK-123456",
      // ... mock response
    }),
  },
}));

// Test code
const booking = await bookingsApi.create(mockRequest);
expect(booking.id).toBe("booking123");
```

---

## API Endpoint Reference

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/bookings` | POST | Create booking | Optional |
| `/bookings/:id` | GET | Get booking | Yes |
| `/bookings` | GET | List bookings | Yes |
| `/bookings/:id/cancel` | PATCH | Cancel booking | Yes |
| `/bookings/availability` | GET | Check availability | No |

---

## Adding New Endpoints

### Step 1: Define Types

Create types in `/src/api/types/`:

```typescript
// /src/api/types/services.ts
export interface ServiceResponse {
  id: string;
  name: string;
  price: number;
  // ... other fields
}
```

### Step 2: Create API Methods

Add to `/src/api/endpoints/`:

```typescript
// /src/api/endpoints/services.ts
import { apiClient } from "@/lib/apiClient";
import type { ServiceResponse } from "../types/services";

export const servicesApi = {
  async getAll(): Promise<ServiceResponse[]> {
    const response = await apiClient.get<ServiceResponse[]>("/services");
    return response.data;
  },
};
```

### Step 3: Export

Update `/src/api/index.ts`:

```typescript
export * from "./endpoints/services";
export * from "./types/services";
```

### Step 4: Use

```typescript
import { servicesApi } from "@/api";

const services = await servicesApi.getAll();
```

---

## Questions?

See [ARCHITECTURE.md](ARCHITECTURE.md) or [CONTRIBUTING.md](CONTRIBUTING.md).

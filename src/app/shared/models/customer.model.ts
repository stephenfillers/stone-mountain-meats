export interface Customer {
  /** Unique identifier for the customer */
  customerId: string;
  /** Full name of the customer */
  firstName: string;
  lastName: string;
  name: string;
  /** Customer's address */
  address: { city: string; state: string; country: string; zip: string };
  /** Customer's phone number */
  phone: string;
  /** Customer's email address */
  email: string;
  /** Additional notes about the customer */
  notes?: string;
}

export interface Customer {
  /** Unique identifier for the customer */
  customerId: string;
  /** Full name of the customer */
  name: string;
  /** Customer's address */
  address: string;
  /** Customer's phone number */
  phone: string;
  /** Customer's email address */
  email: string;
  /** Additional notes about the customer */
  notes?: string;
}

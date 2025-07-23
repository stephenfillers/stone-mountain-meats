import { Customer } from '../../shared/models/customer.model';

/**
 * Example dummy customer data.
 */
export const customers: Customer[] = [
  {
    customerId: 'CUST-001',
    name: 'Alice Johnson',
    address: '123 Maple Street, Springfield, IL 62704',
    phone: '+1-217-555-1234',
    email: 'alice.johnson@example.com',
    notes: 'Prefers email contact. VIP customer.',
  },
  {
    customerId: 'CUST-002',
    name: 'Bob Smith',
    address: '456 Oak Avenue, Lincoln, NE 68508',
    phone: '+1-402-555-5678',
    email: 'bob.smith@example.com',
    notes: 'Requested callback for new offers.',
  },
  {
    customerId: 'CUST-003',
    name: 'Carol Lee',
    address: '789 Pine Road, Madison, WI 53703',
    phone: '+1-608-555-9012',
    email: 'carol.lee@example.com',
    notes: '',
  },
  {
    customerId: 'CUST-004',
    name: 'David Kim',
    address: '321 Birch Lane, Austin, TX 78701',
    phone: '+1-512-555-3456',
    email: 'david.kim@example.com',
    notes: 'Allergic to peanuts.',
  },
];

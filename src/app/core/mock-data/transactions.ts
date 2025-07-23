import { Transaction } from '../../shared/models/transaction.model';

/**
 * Example dummy transaction data.
 */
export const transactions: Transaction[] = [
  {
    transactionId: 'TXN-1001',
    customerId: 'CUST-001',
    transactionDate: '2025-07-10T09:15:00Z',
    processedOnDate: '2025-07-11T14:30:00Z',
    estimatedPrice: 120.0,
    actualPrice: 118.5,
    type: 'Beef',
    processedWeight: 15.2,
  },
  {
    transactionId: 'TXN-1002',
    customerId: 'CUST-002',
    transactionDate: '2025-07-12T11:45:00Z',
    processedOnDate: '2025-07-13T10:00:00Z',
    estimatedPrice: 75.0,
    actualPrice: 77.25,
    type: 'Beef',
    processedWeight: 8.5,
  },
  {
    transactionId: 'TXN-1003',
    customerId: 'CUST-003',
    transactionDate: '2025-07-13T16:20:00Z',
    processedOnDate: '2025-07-14T09:00:00Z',
    estimatedPrice: 200.0,
    actualPrice: 195.0,
    type: 'Hog',
    processedWeight: 22.0,
  },
  {
    transactionId: 'TXN-1004',
    customerId: 'CUST-001',
    transactionDate: '2025-07-15T08:00:00Z',
    processedOnDate: '2025-07-15T17:30:00Z',
    estimatedPrice: 50.0,
    actualPrice: 49.75,
    type: 'Beef',
    processedWeight: 5.0,
  },
  {
    transactionId: 'TXN-1005',
    customerId: 'CUST-004',
    transactionDate: '2025-07-16T13:10:00Z',
    processedOnDate: '2025-07-17T12:00:00Z',
    estimatedPrice: 180.0,
    actualPrice: 182.0,
    type: 'Lamb',
    processedWeight: 20.5,
  },
];

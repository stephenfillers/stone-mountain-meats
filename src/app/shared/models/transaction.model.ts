export interface Transaction {
  /** Unique identifier for the transaction */
  transactionId: string;
  /** The customerId associated with this transaction */
  customerId: string;
  /** Date the transaction was initiated (ISO 8601 format) */
  transactionDate: string;
  /** Date the transaction was processed (ISO 8601 format) */
  processedOnDate: string;
  /** Estimated price before processing */
  estimatedPrice: number;
  /** Actual price after processing */
  actualPrice: number;
  /** Type of transaction (e.g., "purchase", "return", "service") */
  type: string;
  /** Processed weight in kilograms */
  processedWeight: number;
}

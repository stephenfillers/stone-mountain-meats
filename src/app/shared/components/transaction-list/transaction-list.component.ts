import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { transactions } from '../../../core/mock-data/transactions';
// import { customers } from '../../../core/mock-data/customers';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  transactions = transactions;

  // getCustomerName(transaction: Transaction): string | undefined {
  // const customer = customers.find((customer) => customer.customerId === transaction.customerId);
  // return customer?.name;
  // }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { transactions } from '../../../core/mock-data/transactions';
import { Transaction } from '../../../shared/models/transaction.model';
import { customers } from '../../../core/mock-data/customers';
import { Customer } from '../../../shared/models/customer.model';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  formBuilder = new FormBuilder().nonNullable;

  transactionForm = this.formBuilder.group({
    customer: '',
    species: '',
    color: '',
    type: '',
    approximateWeight: '',
  });

  filteredOptions!: Observable<Customer[]>;

  ngOnInit() {
    const control = this.transactionForm.get('customer') as FormControl;

    this.filteredOptions = control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): Customer[] {
    console.log('Filter', value);

    const filterValue = value.toLowerCase();

    return customers.filter((customer) => customer.name.toLowerCase().includes(filterValue));
  }

  displayFn = (customerId: string) => {
    console.log('Customer id (displayfn)', customerId);

    const customer = customers.find((c) => c.customerId === customerId);
    return customer ? customer.name : '';
  };
}

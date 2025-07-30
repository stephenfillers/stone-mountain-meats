import { Component, inject, signal } from '@angular/core';
import { Customer } from '../../../../../shared/models/customer.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageEvent } from '@angular/material/paginator';

interface CustomerApiData {
  items: Customer[];
  pageCount: number;
  totalCount: number;
  nextToken: string;
}

@Component({
  selector: 'app-customers-table',
  imports: [DataTableComponent],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  authService = inject(AuthService);
  endpoint = environment.api.endpoint;
  path = 'customers';
  router = inject(Router);

  customers = signal<Customer[]>([]);
  displayedColumns = ['firstName', 'lastName', 'email', 'phone'];
  resultsLength = 0;
  nextToken = '';

  async ngOnInit() {
    const customerApiData = await this.fetchCustomers();
    this.resultsLength = customerApiData.totalCount;

    this.nextToken = customerApiData.nextToken;
    this.customers.set(customerApiData.items);

    console.log('The next token', this.nextToken);
  }

  async fetchCustomers(direction: 'forward' | 'backward' = 'forward'): Promise<CustomerApiData> {
    const jwt = this.authService.getTokens()?.accessToken;
    const endpoint = `${this.endpoint}${this.path}?nextToken=${this.nextToken}&direction=${direction}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await response.json();
  }

  handleRowClicked(row: unknown) {
    const customer = row as Customer;
    this.router.navigate(['/customers', customer.customerId]);
    console.log('The row', row);
  }

  async handlePageChanged(pageEvent: PageEvent) {
    console.log('The page event', pageEvent);
    let customerApiData: CustomerApiData;

    if (!pageEvent.previousPageIndex || pageEvent.pageIndex > pageEvent.previousPageIndex) {
      customerApiData = await this.fetchCustomers();
    } else {
      console.log('Attempting reverse');

      customerApiData = await this.fetchCustomers('backward');
    }

    this.nextToken = customerApiData.nextToken || this.nextToken;
    this.customers.set(customerApiData.items);
    console.log('The next token', this.nextToken);
  }
}

import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { Customer } from '../../../../../shared/models/customer.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-customers',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './customers-editor.component.html',
  styleUrl: './customers-editor.component.scss',
})
export class CustomersEditorComponent {
  formBuilder = new FormBuilder().nonNullable;
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  endpoint = environment.api.endpoint;
  path = 'customers';
  isLoading = false;

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    }),
    email: ['', Validators.required],
    phone: ['', Validators.required],
    notes: [''],
    customerId: [''],
  });

  async ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('id');
    console.log('Customer id', customerId);

    if (customerId && customerId !== 'new') {
      const customer = await this.fetchCustomer(customerId);
      this.populateForm(customer);
    } else {
      console.log('Generating an ID');

      this.customerForm.patchValue({ customerId: crypto.randomUUID() });
    }
  }

  async fetchCustomer(customerId: string): Promise<Customer> {
    const jwt = this.authService.getTokens()?.accessToken;
    const endpoint = `${this.endpoint}${this.path}/${customerId}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await response.json();
    const customer = data.Items[0];

    return customer;
  }

  populateForm(customer: Customer): void {
    this.customerForm.patchValue(customer);
  }

  async handleSubmit(): Promise<void> {
    this.isLoading = true;

    try {
      const jwt = this.authService.getTokens()?.accessToken;
      const endpoint = `${this.endpoint}${this.path}`;
      const formData = this.customerForm.getRawValue();

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save customer');
      }

      const data = await response.json();
      console.log('Customer saved successfully:', data);

      // TODO: Add success notification
      // this.snackBar.open('Customer saved successfully', 'Close', { duration: 3000 });

      // TODO: Navigate to customer list or detail page
      // this.router.navigate(['/customers']);
    } catch (error) {
      console.error('Error saving customer:', error);
      // TODO: Add error notification
      // this.snackBar.open(error.message || 'Failed to save customer', 'Close', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }

  logForm() {
    console.log(this.customerForm.getRawValue());
  }
}

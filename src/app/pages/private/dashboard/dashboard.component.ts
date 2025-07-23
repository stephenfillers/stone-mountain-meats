import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  authService = inject(AuthService);
  endpoint = environment.api.endpoint;

  async ngOnInit() {
    this.testDb();
  }

  async testDb() {
    /**
     * Sends a GET request with a JWT in the Authorization header.
     * @returns The fetch Response promise.
     */

    const jwt = this.authService.getTokens()?.accessToken;

    const parameters = ['New'];
    const lambda = 'handleDatabaseRequests';

    const endpoint = `${this.endpoint}${lambda}?status=${parameters.join(',')}`;

    return fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}

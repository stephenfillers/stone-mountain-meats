import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-top-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, ThemeToggleComponent, RouterLink],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);

  signOut() {
    this.authService.clearTokens();
    this.router.navigate(['/']);
  }
}

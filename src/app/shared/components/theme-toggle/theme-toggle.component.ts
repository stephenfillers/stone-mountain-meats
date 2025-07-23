import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  // isDarkMode = false;
  themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  constructor() {
    this.isDarkMode.set(localStorage.getItem('darkMode') === 'true');
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('darkMode', this.isDarkMode().toString());
    this.updateTheme();
  }

  updateTheme() {
    const classList = document.body.classList;
    if (this.isDarkMode()) {
      classList.add('dark-mode');
    } else {
      classList.remove('dark-mode');
    }
  }
}

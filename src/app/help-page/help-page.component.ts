import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-page',
  standalone: true,
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {

  constructor(private router: Router) {}

  reloadHelpPage(): void {
    this.router.navigateByUrl('/help-page');
  }
}

import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import nécessaire pour *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-header',
  standalone: true,
  imports: [CommonModule], //, RouterModule] // Ajout de RouterModule
  templateUrl: './help-header.component.html',
  styleUrl: './help-header.component.scss'
})
export class HelpHeaderComponent {

  constructor(private eRef: ElementRef, private router: Router,) {}
  goToHome() {
    this.router.navigate(['/']);
  }

  goToProfessionnals() {
    window.location.href = 'https://info.doctolib.fr/?origin=home-header&utm_button=header&utm_content-group=patient_account&utm_website=doctolib_patients';
}

}

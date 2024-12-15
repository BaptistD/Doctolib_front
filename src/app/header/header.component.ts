import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import nécessaire pour *ngIf
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule  ]
})
export class HeaderComponent {
  public isHelpPopupVisible = false;
  public isConnectedPopupVisible = false;

  public isConnected: boolean = false;


  public constructor(
    private eRef: ElementRef, 
    private router: Router,
    // private authService: AuthService,
    // private userService: UserService,
  ) {}

  // public ngOnInit(): void {
  //   this.isConnected = this.authService.isAuthenticated();

  //   if (this.isConnected) {
  //     this.userService.getUser().subscribe();
  //   }
  // }


  toggleHelpPopup() {
    this.isHelpPopupVisible = !this.isHelpPopupVisible;
  }

  toggleConnectedPopup() {
    this.isConnectedPopupVisible = !this.isConnectedPopupVisible;
  }

  public goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  public goToAppointments(): void {
    this.router.navigate(['/appointments']);
  }

  public disconnect(): void {
    // this.authService.disconnect();
    this.isConnected = false;
  }

  // Écouteur global pour détecter les clics partout dans le document
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.isHelpPopupVisible && !this.eRef.nativeElement.contains(event.target)) {
      // Si le clic est en dehors de la fenêtre pop-up, on la ferme
      /*Cette ligne vérifie si l'élément sur lequel tu as cliqué fait partie du composant actuel (par exemple, 
        si tu as cliqué sur la fenêtre pop-up elle-même ou un bouton à l'intérieur). Si ce n'est pas le cas, 
        cela signifie que tu as cliqué en dehors du composant, et donc on ferme la fenêtre.*/
      this.isHelpPopupVisible = false;
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToSessions() {
    this.router.navigate(['/sessions']);
  }

  goToProfessionnals() {
    window.location.href = 'https://info.doctolib.fr/?origin=home-header&utm_button=header&utm_content-group=patient_account&utm_website=doctolib_patients';
}

}

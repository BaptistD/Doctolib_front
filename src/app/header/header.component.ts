import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import nécessaire pour *ngIf
// import { RouterModule } from '@angular/router'; // Import pour routerLink

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule] //, RouterModule] // Ajout de RouterModule
})
export class HeaderComponent {
  isHelpPopupVisible = false;

  constructor(private eRef: ElementRef) {}

  toggleHelpPopup() {
    this.isHelpPopupVisible = !this.isHelpPopupVisible;
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
}

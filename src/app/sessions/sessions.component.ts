import { Component } from '@angular/core';
import { ChoseComponent } from './component/chose/chose.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [ChoseComponent, ConnexionComponent, InscriptionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

}

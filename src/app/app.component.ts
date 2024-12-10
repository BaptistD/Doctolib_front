import { Component} from '@angular/core';
import { RouterOutlet, Router} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HelpHeaderComponent } from './help-header/help-header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SessionsComponent } from './sessions/sessions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, PageNotFoundComponent, HelpHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'projet_doctolib_front';
}

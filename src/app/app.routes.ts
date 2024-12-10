import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SessionsComponent } from './sessions/sessions.component';
import { HelpPageComponent } from './help-page/help-page.component'; // Import du bon composant

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'sessions', component: SessionsComponent},
    {path: 'help', component: HelpPageComponent}, // Route pour la page d'aide (help_page)
    {path: '**', component: PageNotFoundComponent},
];
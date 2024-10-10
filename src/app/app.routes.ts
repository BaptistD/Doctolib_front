import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SessionsComponent } from './sessions/sessions.component';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'sessions', component: SessionsComponent},
    {path: '**', component: PageNotFoundComponent},
];

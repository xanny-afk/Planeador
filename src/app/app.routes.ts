import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: 'calendario',
        //canActivate: [authGuard],
        loadComponent: () => import('./pages/calendario/calendario.component').then(c => c.CalendarioComponent)
    },
    {
        path: 'estudiantes',
        //canActivate: [authGuard],
        loadComponent: () => import('./pages/estudiantes/estudiantes.component').then(c => c.EstudiantesComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];

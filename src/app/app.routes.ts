import { Routes } from '@angular/router';
import { PostDetailsComponent } from './features/post-details/components/post-details.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
    { path: 'post-details/:id', component: PostDetailsComponent },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }
];

import { Routes } from '@angular/router';
import { PostDetailsComponent } from './features/post-details/components/post-details.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { AuthGuard } from './core/services/auth.guard';
import { CreateEditPostComponent } from './features/create-edit-post/create-edit-post.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
    { path: 'post-details/:id', component: PostDetailsComponent },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'create-post', component: CreateEditPostComponent, canActivate: [AuthGuard] },
    { path: 'edit-post/:id', component: CreateEditPostComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent },
];

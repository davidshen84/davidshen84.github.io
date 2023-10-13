import { Routes } from '@angular/router';
import { BlogHomePageComponent } from './blog-home-page/blog-home-page.component';
import { BlogPageNotFoundComponent } from './blog-page-not-found/blog-page-not-found.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

export const routes: Routes = [
  { path: '', component: BlogHomePageComponent },
  { path: ':id', component: BlogPageComponent },
  { path: 'notfound/:id', component: BlogPageNotFoundComponent },
];

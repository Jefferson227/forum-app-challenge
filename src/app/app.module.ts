import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { AuthGuard } from './providers/auth/auth.guard';
import { FirebaseService } from './providers/firebase/firebase.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: '', component: HomeComponent, children: [
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'post-content', component: PostContentComponent, canActivate: [AuthGuard] },
    { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarTopComponent,
    BreadcrumbComponent,
    HomeComponent,
    CategoryComponent,
    PostsComponent,
    PostComponent,
    PostContentComponent,
    NewPostComponent,
    LoginComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { NewDiscussionComponent } from './components/new-discussion/new-discussion.component';
import { DiscussionContentComponent } from './components/discussion-content/discussion-content.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/discussions', pathMatch: 'full' },
  { path: '', component: HomeComponent, children: [
    { path: 'discussions', component: DiscussionsComponent, canActivate: [AuthGuard] },
    { path: 'discussion', component: DiscussionComponent, canActivate: [AuthGuard] },
    { path: 'new-discussion', component: NewDiscussionComponent, canActivate: [AuthGuard] },
    { path: 'discussion-content/:hash', component: DiscussionContentComponent, canActivate: [AuthGuard] },
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
    CategoriesComponent,
    DiscussionsComponent,
    DiscussionComponent,
    NewDiscussionComponent,
    DiscussionContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

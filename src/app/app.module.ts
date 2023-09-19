import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MovieCardComponent } from './pages/home/components/movie-card/movie-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/module/material.module';
import { MovieListComponent } from './pages/home/components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { DetailsHeaderComponent } from './shared/components/details-header/details-header.component';
import { AddEditMovieComponent } from './pages/add-edit-movie/add-edit-movie.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DialogboxComponent } from './shared/components/dialogbox/dialogbox.component';
import { PasswordDialogComponent } from './shared/components/password-dialog/password-dialog.component';
import { AuthInterceptorInterceptor } from './interceptors/auth/auth.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MovieCardComponent,
    MovieListComponent,
    MovieDetailsComponent,
    TitlePipe,
    DetailsHeaderComponent,
    AddEditMovieComponent,
    DialogboxComponent,
    PasswordDialogComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

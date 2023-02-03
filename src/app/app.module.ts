import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FlashcardFormComponent } from './components/flashcards/flashcard-form/flashcard-form.component';
import { FlashcardsListComponent } from './components/flashcards/flashcards-list/flashcards-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlashcardsComponent,
    SignInComponent,
    SignUpComponent,
    FlashcardFormComponent,
    FlashcardsListComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

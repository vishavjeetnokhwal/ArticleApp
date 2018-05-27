import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArticlesPage } from '../pages/articles/articles';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditarticlePage } from '../pages/editarticle/editarticle';
import { PaymentsPage } from '../pages/payments/payments';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { HttpModule } from '@angular/http';
import { ArticleService } from '../services/article';
import { ShortPipe } from '../pipes/short/short';
import { DayPipe } from '../pipes/days';
import { AuthService } from '../services/auth';
import { ArticlePage } from '../pages/article/article';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArticlesPage,
    ArticlePage,
    LoginPage,
    SignupPage,
    EditarticlePage,
    PaymentsPage,
    ProfilePage,
    SettingsPage,
    ShortPipe,
    DayPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArticlesPage,
    ArticlePage,
    LoginPage,
    SignupPage,
    EditarticlePage,
    PaymentsPage,
    ProfilePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ArticleService,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ArticlesPage } from '../pages/articles/articles';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { EditarticlePage } from '../pages/editarticle/editarticle';
import { AuthService } from '../services/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild('nav') nav: NavController;
  user: any;
  rootPage = ArticlesPage;
  loginPage = LoginPage;
  signUpPage = SignupPage;
  settingsPage = SettingsPage;
  profilePage = ProfilePage;
  editArticlePage = EditarticlePage;
  homePage = ArticlesPage;

  constructor(private menuCtrl: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private authService: AuthService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

  }

  onPageLoad(page: any) {
    if (page == this.editArticlePage || page == this.profilePage) {
      if (page == this.profilePage)
        this.nav.push(page);
      else
        this.nav.push(page, { mode: 'New' }).then(decision => {
          if (!decision)
            this.nav.setRoot(this.loginPage);
        });


      this.menuCtrl.close();
      return;
    }
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogout() {
    window.localStorage.clear();
    this.onPageLoad(this.rootPage);

  }
}


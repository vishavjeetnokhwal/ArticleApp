import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { NavController, ToastController } from 'ionic-angular';
import { ArticlesPage } from '../articles/articles';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(private authService: AuthService,
    private navCtrl: NavController,
    private toast: ToastController) { }


  onLogin(form: NgForm) {
    this.authService.login(form.value)
      .subscribe((data) => {
        if (data.success) {
          window.localStorage.setItem('user', JSON.stringify(data.user));
          window.localStorage.setItem('auth-token', data.token);
          this.navCtrl.setRoot(ArticlesPage);
          form.reset();
        }
        this.toast.create({
          message: data.msg,
          duration: 1200
        }).present();
      });

  }

}

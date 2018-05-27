import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService: AuthService,
    private navCtrl: NavController,
    private toast: ToastController) { }

  onSignUp(form: NgForm) {
    let cssClass = "danger-class";
    this.authService.register(form.value)
      .subscribe((data) => {
        if (data.success) {
          this.navCtrl.setRoot(LoginPage);
          cssClass = "success-class";
          form.reset();
        }
        this.toast.create({
          message: data.msg,
          duration: 3000,
          cssClass: cssClass
        }).present();

      });
  }

}

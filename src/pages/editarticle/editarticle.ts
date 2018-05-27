import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, App, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article';
import { ArticlesPage } from '../articles/articles';

@Component({
  selector: 'page-editarticle',
  templateUrl: 'editarticle.html',
})
export class EditarticlePage implements OnInit {
  pageTitle = "";
  pageMode: string;
  articleForm: FormGroup;
  article: any;
  constructor(private navParams: NavParams,
    private app: App,
    private navCtrl: NavController,
    private toast: ToastController,
    private articleService: ArticleService) {


  }

  ngOnInit() {
    this.pageMode = this.navParams.get('mode');
    this.article = this.navParams.get('article');
    this.pageTitle = this.pageMode + " Article";

    if (this.pageMode == "Edit") {
      this.initForm(this.article);
      return;
    }
    this.article = {
      title: null,
      image: null,
      desc: null,
    };
    this.initForm(this.article);
  }

  //=======================================
  //        AUTH GAURD
  //=======================================
  ionViewCanEnter() {
    if (window.localStorage.getItem('user')) {
      return true;
    }
    else {
      this.toast.create({
        message: "You need to login first !",
        duration: 2000
      }).present();
      return false;
    }

  }
  //========================================
  //  FORM SUBMITION
  //========================================
  onSubmit() {
    if (this.pageMode == 'New')
      this.addNewArticle();
    else
      this.updateArticle();

  }
  //==========================================
  //        FORM INITIALIZATION
  //==========================================
  initForm(data: any) {
    this.articleForm = new FormGroup({
      title: new FormControl(data.title, Validators.required),
      image: new FormControl(data.image, Validators.required),
      desc: new FormControl(data.desc, Validators.required)
    });
  }
  //==========================================
  //        NEW ARTICLE CREATION
  //==========================================
  addNewArticle() {
    this.articleService.addArticle(this.articleForm.value)
      .subscribe(data => {
        if (data.success) {
          this.app.getRootNav().setRoot(ArticlesPage);
          this.articleForm.reset();
        }
        this.toast.create({
          message: data.msg,
          duration: 2000
        }).present();

      });
  }
  //==========================================
  //        NEW ARTICLE CREATION
  //==========================================
  updateArticle() {
    this.articleService.updateArticle(this.articleForm.value, this.article._id)
      .subscribe((data) => {
        if (data.success) {
          this.app.getRootNav().setRoot(ArticlesPage);
        }
        this.toast.create({
          message: data.msg,
          duration: 2000
        }).present();
      });


  }


  //======================================
  //    ON CANCEL ARTICLE OPERATIONS
  //=======================================
  onCancel() {
    if (this.pageMode == "Edit")
      this.navCtrl.pop();
    // this.app.getRootNav().setRoot(ArticlePage, { article: this.article });
    else
      this.navCtrl.pop();
    // this.app.getRootNav().setRoot(ArticlesPage);

  }

}

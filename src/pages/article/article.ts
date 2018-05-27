import { Component, OnInit } from '@angular/core';
import { NavParams, App, ToastController, AlertController, NavController } from 'ionic-angular';
import { EditarticlePage } from '../editarticle/editarticle';
import { ArticleService } from '../../services/article';
import { ArticlesPage } from '../articles/articles';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage implements OnInit {

  article: any;
  isLiked: boolean = false;
  user: any;
  constructor(public navParams: NavParams,
    public articleService: ArticleService,
    public navCtrl: NavController,
    public app: App,
    public alertCtrl: AlertController,
    public toast: ToastController) {
  }
  ngOnInit() {
    this.article = this.navParams.get('article');
    this.user = JSON.parse(window.localStorage.getItem('user'));
    let index = this.user.liked.indexOf(this.article._id);
    if (index > -1)
      this.isLiked = true;
    console.log(this.article);
    console.log(this.user);


  }
  //=========================================
  //      AUTH GAURD
  //=========================================
  ionViewCanEnter() {
    if (window.localStorage.getItem('user'))
      return true;
    else {
      this.toastCtrl("You need to login first !");
      return false;
    }
  }

  //==========================================
  //       TO EDIT ARTICLE PAGE
  //==========================================

  onEditArticle() {
    this.navCtrl.push(EditarticlePage, { mode: 'Edit', article: this.article });
  }
  //==========================================
  //        DELETE ARTICLE
  //==========================================
  deleteArticle() {

    this.alertCtrl.create({
      title: "Confirm Delete ?",
      message: "Do you want to delete this article",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.articleService.deleteArticle(this.article._id)
              .subscribe((data) => {
                if (data.success) {
                  this.navCtrl.pop();
                  this.app.getRootNav().setRoot(ArticlesPage);
                }


                this.toastCtrl(data.msg);
              });
          }
        }
      ]
    }).present();
  }

  //============================================
  //            ON LIKE ARTICLE
  //============================================
  onLike() {
    this.articleService.onLike(this.article._id)
      .subscribe((data) => {
        if (data.success) {
          this.isLiked = true;
          let user = JSON.parse(window.localStorage.getItem('user'));
          user.liked.push(this.article._id);
          window.localStorage.setItem('user', JSON.stringify(user));
        }
        else {
          this.toastCtrl(data.msg);
        }
      });
  }

  //================================
  // ON COMMENT
  //================================
  onComment() {

    this.alertCtrl.create({
      title: 'Add Comment',
      inputs: [
        {
          name: 'content',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.articleService.onComment(this.article._id, data)
              .subscribe((data: any) => {
                if (data.success) {
                  this.article.comments.push(data.comment);
                }
                else {
                  this.toastCtrl(data.msg);
                }
              });
          }
        }
      ]
    }).present();
  }

  //================================
  // ON DELETE COMMENT
  //================================
  onDeleteComment(id: string, index: number) {
    this.alertCtrl.create({
      title: "Delete Comment",
      message: "Do you really want to delete this comment ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: "Delete",
          handler: () => {
            this.articleService.onDeleteComment(id)
              .subscribe(data => {
                if (data.success) {
                  this.article.comments.splice(index, 1);
                }

                this.toastCtrl(data.msg);
              });
          }
        }
      ]
    }).present();
  }
  //================================================
  //      ON EDIT COMMENT
  //================================================
  onEditComment(comment: any, index: number) {
    this.alertCtrl.create({
      title: 'Edit Comment',
      inputs: [
        {
          name: 'content',
          value: comment.content
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.articleService.onUpdateComment(comment._id, data)
              .subscribe((data: any) => {
                if (data.success) {
                  this.article.comments[index] = data.cmt;
                }

                this.toastCtrl(data.msg);

              });
          }
        }
      ]
    }).present();
  }

  ///==================================
  //    TOAST HANDLER
  //===================================
  toastCtrl(message: string) {
    this.toast.create({
      message: message,
      duration: 2000
    }).present();
  }

}

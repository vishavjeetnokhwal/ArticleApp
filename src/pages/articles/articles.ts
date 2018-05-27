import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article';
import { ArticlePage } from '../article/article';
import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage implements OnInit {
  articles: any[] = [];
  constructor(public articleService: ArticleService,
    private navCtrl: NavController,
    private app: App,
    private authService: AuthService) {
  }
  ngOnInit() {
    this.articleService.getAllArticles()
      .subscribe((articles: any[]) => {
        this.articles = articles;
      });
    var user;
    if (window.localStorage.getItem('user')) {
      user = JSON.parse(window.localStorage.getItem('user'));
    }
    this.authService.user.next(user);
  }
 
  //==========================================
  //        SINGLE ARTICLE VIEW
  //==========================================
  onViewArticle(article: any) {
    this.navCtrl.push(ArticlePage, { article: article }).then(decision => {
      if (!decision)
        this.app.getRootNav().setRoot(LoginPage);
    });
  }

}

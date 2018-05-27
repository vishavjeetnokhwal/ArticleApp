import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { LoadingController } from "ionic-angular";
@Injectable()
export class ArticleService {
    articles: any[] = [];
    apiUrl: string = "https://peaceful-atoll-81724.herokuapp.com/";

    constructor(private http: Http, private loadingCtrl: LoadingController) { }
    //====================================================
    //      GETTING ALL ARTICLES
    //====================================================
    getAllArticles() {
        let loader = this.loader("Loading Articles..");
        loader.present();
        return this.http.get(this.apiUrl + 'articles')
            .map((res: Response) => {
                this.articles = res.json();
                loader.dismiss();
                return res.json();
            });
    }
    //====================================================
    //      ADDING ARTICLE
    //====================================================

    addArticle(article: any) {
        let loader = this.loader("Adding please wait...");
        loader.present();

        let headers = this.header();

        return this.http.post(this.apiUrl + "articles", article, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });
    }
    //====================================================
    //      UPDATE ARTICLE
    //====================================================
    updateArticle(data: any, id: string) {
        let loader = this.loader("Updating please wait...");
        loader.present();

        let headers = this.header();

        return this.http.put(this.apiUrl + 'articles/' + id, data, { headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });

    }
    //====================================================
    //      DELETE ARTICLE
    //====================================================
    deleteArticle(id: string) {
        let loader = this.loader("Deleting please wait...");
        loader.present();
        let headers = this.header();
        return this.http.delete(this.apiUrl + 'articles/' + id, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            })
    }

    //============================================
    //            ON LIKE ARTICLE
    //============================================
    onLike(id: string) {
        let token = window.localStorage.getItem('auth-token');
        let headers = new Headers();
        headers.append('Authorization', token);

        return this.http.get(this.apiUrl + "articles/" + id + "/like", { headers: headers })
            .map((res: Response) => {
                return res.json();
            });

    }
    //============================================
    //            ON COMMENT
    //============================================
    onComment(id: string, comment: any) {

        let loader = this.loader("Adding Comment...");
        loader.present();

        let headers = this.header();
        return this.http.post(this.apiUrl + "articles/" + id + "/comment", comment, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });

    }

    //============================================
    //            ON COMMENT
    //============================================
    onUpdateComment(id: string, content: any) {

        let loader = this.loader("Updating Comment...");
        loader.present();

        let headers = this.header();

        return this.http.put(this.apiUrl + "comment/" + id, content, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });

    }

    //============================================
    //            ON COMMENT
    //============================================
    onDeleteComment(id: string) {

        let loader = this.loader("Deleting Comment...");
        loader.present();
        let headers = this.header();

        return this.http.delete(this.apiUrl + "comment/" + id, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });

    }


    //============================================
    //               HEADERS CREATOR
    //============================================
    header() {
        let token = window.localStorage.getItem('auth-token');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        return headers;
    }
    //============================================
    //               LOADER CREATOR
    //============================================
    loader(msg: string) {
        let loader = this.loadingCtrl.create({
            content: msg,
            duration: 10000
        });
        return loader;
    }
}
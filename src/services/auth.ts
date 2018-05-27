import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { Subject } from "rxjs/Subject";
@Injectable()
export class AuthService {
    apiUrl: string = "https://peaceful-atoll-81724.herokuapp.com/";
    user = new Subject<any>();
    constructor(private http: Http, private loadingCtrl: LoadingController) { }
    //=========================================
    //         REGISTRATION
    //=========================================
    register(data: any) {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration:10000
        });
        loader.present();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'register', data, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });
    }

    //=========================================
    //         LOGIN
    //=========================================

    login(data: any) {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration:10000
            
        });
        loader.present();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + "login", data, { headers: headers })
            .map((res: Response) => {
                loader.dismiss();
                return res.json();
            });
    }
}
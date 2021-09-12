import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetResponse } from 'src/app/interfaces/get-response';
import { PostResponse } from 'src/app/interfaces/post-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    headers: HttpHeaders;

    constructor(
        private http: HttpClient
    ) { 
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    
    getArticlesCategories(): Observable<GetResponse> {
        return this.http.get<GetResponse>(`${environment.url}home`, {headers: this.headers});
    }

    getAllArticles(value: number): Observable<GetResponse> {
        return this.http.get<GetResponse>(`${environment.url}articles/show/${value}`, {headers: this.headers});
    }
  
}

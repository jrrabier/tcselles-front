import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInAnimation } from 'src/app/animations';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    getArticlesCategories$: Subscription;
    getAllArticles$: Subscription;
    isRequestingCategories: boolean = true;
    isRequestingArticles: boolean = true;

    categoriesList: [];
    articlesList: [];

    categoriesForm: FormGroup;

    constructor(
        private router: Router,
        private homeService: HomeService,
        private fb: FormBuilder
    ) {
        this.getArticlesCategories$ = new Subscription();
        this.getAllArticles$ = new Subscription();
    }

    ngOnInit() {

        this.categoriesForm = this.fb.group({
            articleCategory: 0
        });
        
        this.getArticlesCategories$ = this.homeService.getArticlesCategories().subscribe(
            data => {
                if (data.success) {
                    this.categoriesList = data.result;
                    this.isRequestingCategories = false;
                }
            }
        );

        this.onSubmit();
    }

//   prepareRoute(outlet: RouterOutlet) {
//     return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
//   }

    onSubmit() {
        this.getAllArticles$ = this.homeService.getAllArticles(
            this.categoriesForm.get('articleCategory').value
        ).subscribe(
            data => {
                if (data.success) {
                    this.articlesList = data.articles;
                    this.isRequestingArticles = false;
                }
                console.log(this.articlesList);
                
            }
        );
    }

}

import { LoadingState } from '../../../../core/models/loading-state.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListConfig } from '../../models/article-list-config.model';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/articles.service';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
    ArticlePreviewComponent
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  query!: ArticleListConfig;
  results: Article[] = [];
  currentPage = 1;
  totalPages: Array<number> = [];
  loading = LoadingState.NOT_LOADED;
  LoadingState = LoadingState;

  @Input() limit!: number;
  @Input()
  set config(config: ArticleListConfig){
    if(config){
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  constructor(private articleService: ArticleService){}

  setPageTo(pageNumber: number){
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery(){
    this.loading = LoadingState.LOADING;

    this.results = [];

    if(this.limit){
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService
      .query(this.query)
      .subscribe((data) => {
        this.loading = LoadingState.LOADED
        this.results = data.articles

        this.totalPages = Array.from(
          new Array(Math.ceil(data.articlesCount / this.limit)),
          (val, index) => index + 1,
        )
      });
  }

}

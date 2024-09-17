import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Observable, map } from "rxjs";
import { Article } from '../models/article.model';

@Injectable({ providedIn: "root"})
export class ArticleService {
    constructor (private readonly http: HttpClient){}

    query(
        config: ArticleListConfig
    ): Observable<{articles: Article[]; articlesCount: number }>{
        let params = new HttpParams();

        Object.keys(config.filters).forEach((key) => {
            // @ts-ignore
            params = params.set(key, config.filters[key]);
        })

        return this.http.get<{ articles: Article[]; articlesCount: number}>(
            "/articles" + (config.type === "feed" ? "/feed" : ""),
            { params }
        );
    }

    get(slug: string): Observable<Article> {
        return this.http
        .get<{article: Article}>(`/article/${slug}`)
        .pipe(map((data) => data.article));
    }
    
    delete(slug: string): Observable<void>{
        return this.http.delete<void>(`/articles/${slug}`);
    }

    create(article: Partial<Article>): Observable<Article>{
        return this.http
        .post<{article: Article}>("/articles/", {article: article})
        .pipe(map((data) => data.article));
    }

    update(article: Partial<Article>): Observable<Article> {
        return this.http
            .put<{article: Article}>(`/article/${article.slug}`, {
                article: article
            })
            .pipe(map((data) => data.article))
    }

    favorite(slug: string): Observable<Article> {
        return this.http
            .post<{article: Article}>(`/article/${slug}/favorite`, {})
            .pipe(map((data) => data.article))
    }

    unfavorite(slug: string): Observable<void> {
        return this.http.delete<void>(`/articles/${slug}/favorite`);
    }
}


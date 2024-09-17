import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { Route, Router } from '@angular/router';
import { ArticleService } from '../../services/articles.service';
import { UserService } from 'src/app/core/auth/services/user.service';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {
  isSubmitting = false;

  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly userService: UserService
  ){}

  toggleFavorite(): void{
    this.isSubmitting = true;

    this.userService.isAuthenticated
    .pipe(
      switchMap((authenticated) => {
        if(!authenticated){
          void this.router.navigate(["/register"]);
          return EMPTY;
        }

        if(!this.article.favorited){
          return this.articleService.favorite(this.article.slug)
        }else{
          return this.articleService.unfavorite(this.article.slug);
        }
      })
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toggle.emit(!this.article.favorited);
      },
      error: () => {this.isSubmitting = false}
    });
  }

}

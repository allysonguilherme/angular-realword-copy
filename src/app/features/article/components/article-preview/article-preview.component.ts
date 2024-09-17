import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { RouterLink } from '@angular/router';
import { ArticleMetaComponent } from '../article-meta/article-meta.component';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleMetaComponent, FavoriteButtonComponent],
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent {
  @Input() article!: Article


  toggleFavorite(favorited: boolean) : void {
    this.article.favorited = favorited;

    if(favorited)
      this.article.favoriesCount++;
    else
      this.article.favoriesCount--;
  }

}

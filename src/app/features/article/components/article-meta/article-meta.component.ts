import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-meta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent {
  @Input() article!: Article;


}

import { Component, OnInit, inject} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ArticleListConfig } from '../../models/article-list-config.model';
import { Router } from '@angular/router';
import { TagService } from '../../services/tags.service';
import { tap } from 'rxjs';
import { ArticleListComponent } from '../../components/article-list.component/article-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    ArticleListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent implements OnInit{
  listConfig: ArticleListConfig = {
    type: "all",
    filters: {},
  };
  tags: string[] = [];
  tags$ = inject(TagService)
  .getAll()
  .pipe(tap(() => (this.tagsLoaded = true))).subscribe(
    data => this.tags = data
  );

  tagsLoaded = false;

  /**
   *
   */
  constructor( 
    private readonly router: Router
  ) {}


  ngOnInit(): void {
    
  }

  setListTo(type: string = "", filters: Object = {}): void{
    this.listConfig = { type: type, filters: filters}
  }
}

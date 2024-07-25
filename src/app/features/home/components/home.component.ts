import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, SearchInputComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
      this.filteredPosts = data;
    });
  }

  filterPosts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPosts();
  }
}

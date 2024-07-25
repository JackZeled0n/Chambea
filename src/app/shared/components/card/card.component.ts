import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() summary: string = '';
  @Input() imageUrl: string = '';
  @Input() author: string = '';
  @Input() date: string = '';
  @Input() id: string = '';

  constructor(private router: Router) {}

  isFavorite: boolean = false;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  truncateContent(content: string, limit: number): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  onSeePostClick() {
    this.router.navigate(['/post-details', this.id]);
  }
}

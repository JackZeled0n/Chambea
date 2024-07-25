import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() imageUrl: string = '';
  @Input() userName: string = '';
  @Input() date: string = '';

  isFavorite: boolean = false;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  truncateContent(content: string, limit: number): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }
}

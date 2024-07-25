import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() imageUrl: string = '';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
}

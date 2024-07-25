import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() searchQuery: string = '';
  @Input() resultCount: number = 0;
  @Output() searchQueryChange = new EventEmitter<string>();

  onInputChange() {
    this.searchQueryChange.emit(this.searchQuery);
  }
}

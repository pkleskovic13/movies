import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}

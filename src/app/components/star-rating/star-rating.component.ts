import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() size!: number;
  @Input() color: string = '#fcc419';
  @Output() onSetRating = new EventEmitter();

  rating: number = 0;
  tempRating: number = 0;
  @Input() maxRating = 5;

  stars: number[] = [];

  containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };
  starContainerStyle = {
    display: 'flex',
  };

  handleRating(rating: number) {
    this.rating = rating;
    this.onSetRating.emit(rating);
  }

  setTempRating(rating: number) {
    this.tempRating = rating;
  }

  ngOnInit() {
    this.stars = Array.from({ length: this.maxRating }, (_, i) => i + 1);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
  @Input() size: number = 24;
  @Input() full: boolean = false;
  @Input() color: string = '';
  @Output() hoverIn = new EventEmitter<void>();
  @Output() hoverOut = new EventEmitter<void>();
  @Output() onRate = new EventEmitter<void>();
  // @Input() hoverIn: () => void = () => {};
  starStyle: { [key: string]: string } = {};
  ngOnInit() {
    this.starStyle = {
      width: `${this.size}px`,
      height: `${this.size}px`,
      display: 'block',
      cursor: 'pointer',
    };
  }

  onHoverIn() {
    this.hoverIn.emit();
  }
  onHoverOut() {
    this.hoverOut.emit();
  }
}

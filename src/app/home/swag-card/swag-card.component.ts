import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-swag-card',
  templateUrl: './swag-card.component.html',
  styleUrls: ['./swag-card.component.scss'],
})
export class SwagCardComponent implements AfterViewInit {

  @Input() cards: Array<{
    icon: string,
    name: string
  }>;

  @ViewChildren('swagCards') swagCards: QueryList<ElementRef>;
  swagCardsArray: Array<ElementRef>;

  private moveOutWidth: number;
  private shiftRequired: boolean;
  private transitionInProgress: boolean;

  public like: boolean;
  public dislike: boolean;

  @Output() resetMade = new EventEmitter();

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.swagCardsArray = this.swagCards.toArray();

    this.swagCards.changes.subscribe(() => {
      this.swagCardsArray = this.swagCards.toArray();
    });
  }

  panHandler(event): void {
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) {
      return;
    }

    if (this.transitionInProgress) {
      this.shiftHandler();
    }

    this.renderer.addClass(this.swagCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceHandler(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceHandler(true, false);
    }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.swagCardsArray[0].nativeElement,
      'transform',
      'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)'
    );

    this.shiftRequired = true;
  }

  panEndHandler(event): void {
    this.toggleChoiceHandler(false, false);

    if (!this.cards.length) {
      return;
    }

    this.renderer.removeClass(this.swagCardsArray[0].nativeElement, 'moving');

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
      this.renderer.setStyle(this.swagCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;
    } else {
      const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event['velocityY']) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.swagCardsArray[0].nativeElement,
        'transform',
        'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)'
      );

      this.shiftRequired = true;
    }

    this.transitionInProgress = true;
  }

  shiftHandler(): void {
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    }

    this.transitionInProgress = false;
    this.toggleChoiceHandler(false, false);
  }

  toggleChoiceHandler(dislike: boolean, like: boolean): void {
    this.dislike = dislike;
    this.like = like;
  }

  resetCard(): void {
    this.resetMade.emit();
  }

}

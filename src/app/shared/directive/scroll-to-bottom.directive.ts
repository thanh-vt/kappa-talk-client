import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy} from '@angular/core';

declare global {
  interface Window {
    ResizeObserver: any;
  }
}

@Directive({
  selector: '[appScrollToBottom]',
  exportAs: 'appScrollToBottom'
})
export class ScrollToBottomDirective implements OnChanges, AfterViewInit, OnDestroy {

  @Input() stayAtBottom = false;

  private changes: MutationObserver;
  private readonly el;

  constructor(private self: ElementRef) {
    this.el = this.self.nativeElement;
  }

  public ngOnChanges() {
  }

  public ngAfterViewInit() {

    this.changes = new MutationObserver(() => {
      if (this.stayAtBottom === true) {
        this.scrollToBottom();
      }
    });

    this.changes.observe(this.el, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }

  public ngOnDestroy() {
    if (this.changes != null) {
      this.changes.disconnect();
    }
  }

  public scrollToBottom() {
    setTimeout(() => this.el.scrollTop = this.el.scrollHeight, 0);
  }

}

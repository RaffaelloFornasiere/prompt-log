import {Directive, ElementRef, HostListener, Renderer2, AfterViewInit, input} from '@angular/core';

@Directive({
  selector: '[appShineEffect]',
  standalone: true,
})
export class ShineEffectDirective implements AfterViewInit {
  private originalBG: string = 'transparent';
  lightColor = input('rgba(255,255,255,0.1)');
  gradientSize = input(100);

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    // Store the original background or set a fallback color
    const computedStyle = getComputedStyle(this.el.nativeElement);
    this.originalBG = computedStyle.backgroundColor || 'rgba(0, 0, 0, 0.1)';

    // Ensure a default background if it's transparent
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.originalBG);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const gradient = `radial-gradient(circle ${this.gradientSize()}px at ${x}px ${y}px, ${this.lightColor()}, ${this.originalBG})`;

    this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', gradient);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // Reset to original background color
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundImage');
  }
}

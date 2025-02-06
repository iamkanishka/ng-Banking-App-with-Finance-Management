import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  template: `
  
  <ProgressPrimitive.Indicator
      class={cn('h-full w-full flex-1 bg-primary transition-all', indicatorclass)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />

  `,
 
})
export class ProgressBarComponent {

}

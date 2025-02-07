import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone:true,
  imports: [],
  template: `
  
  <div class="relative h-4 w-full overflow-hidden rounded-full bg-secondary {{class}}">
      <div
        class="h-full w-full flex-1 bg-primary transition-all {{indicator_class}}"
        style="transform: translateX(-#{100 - (@value || 0)}%);"
      />
    </div>

  `,
 
})
export class ProgressBarComponent {
 


}

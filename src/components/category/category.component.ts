import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [],
  template: `
  
  <div class={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure class={cn("flex-center size-10 rounded-full", circleBg)}>
        <img src={icon} width={20} height=20} alt={category.name} />
      </figure>
      <div class="flex w-full flex-1 flex-col gap-2">
        <div class="text-14 flex justify-between">
          <h2 class={cn("font-medium", main)}>{{category.name}}</h2>
          <h3 class={cn("font-normal", count)}>{{category.count}}</h3>
        </div>
        <app-progress
          value={(category.count / category.totalCount) * 100}
          class={cn("h-2 w-full", progressBg)}
          indicatorclass={cn("h-2 w-full", indicator)}
        /> <app-progress>
      </div>
    </div>

  `,
 
})
export class CategoryComponent {

}

import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-category',
  imports: [ProgressBarComponent],
  template: ` 
  <div class="gap-[18px] flex p-4 rounded-xl  {{style.bg}} ">

  <figure class="flex-center size-10 rounded-full {{style.circleBg}}">
       <img [src]="icon" width="20" height="20" [alt]=category.name />
       </figure>

       <div class="flex w-full flex-1 flex-col gap-2">
         <div class="text-14 flex justify-between">
           <h2 class="font-medium {{style.main}}" >{{category.name}}</h2>
           <h3 class="font-normal {{style.count}}" >{{category.count}}</h3>
         </div>

         <app-progress-bar
           [value]="(category.count / category.totalCount) * 100"
           class="h-2 w-full {{progressB}}"
           indicatorclass="h-2 w-full {{indicator}}"
         /> <app-progress-bar>
         </div>

  </div> `,
})
export class CategoryComponent {

  style: object = {};
  category: object = {};

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}

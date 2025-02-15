import { Component, OnInit } from '@angular/core';
import { transactionCategoryStyles } from '../../utils/constants';

@Component({
  selector: 'app-category-badge',
  imports: [],
  template: `
  
  

  <div ngClass="{'category-badge {{get_style(@chip_style, :border_color)}}  {{get_style(@chip_style, :chip_background_color)}} '}">
      <div [ngClass]="{'size-2 rounded-ful' {{get_style(@chip_style, :background_color)}} }""></div>

      <p [ngClass]={["text-[12px] font-medium", get_style(@chip_style, :text_color)]}>{@category}</p>
    </div>

  `,
 
})
export class CategoryBadgeComponent  implements OnInit {
  
  Input() constant: string = ''
  
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
   } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
   

  constructor() {}
  ngOnInit(): void {}


}

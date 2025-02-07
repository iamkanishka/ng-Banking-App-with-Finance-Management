import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [NgClass],
  template: `
  
  
   <footer class="footer">
    <div [ngClass]="{'' + type == 'mobile' ? 'footer_name-mobile': 'footer_name'}">
      <p class="text-xl font-bold text-gray-700">
        {{capitalize_first_letter(user["first_name"])}}
      </p>
    </div>

    <div [ngClass]={"" <> if type == "mobile", do: "footer_email-mobile", else: "footer_email"}>
      <h1 class="text-14 truncate text-gray-700 font-semibold">
        {"#{user["first_name"]} #{user["last_name"]}"}
      </h1>

      <p class="text-14 truncate font-normal text-gray-600">
        {String.slice("#{user["email"]}", 0, 20)}...
      </p>
    </div>

    <div class="footer_image" (click)="handle_log_out()" >
      <img src="./assets/images/logout.svg" alt="logout" />
    </div>
  </footer>
  `,
 
 
})
export class FooterComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
 constructor() {}

 capitalize_first_letter(firstname:string){

 }

 handle_log_out(){}

}

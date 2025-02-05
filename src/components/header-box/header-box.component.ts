import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-box',
  imports: [],
  template: `<div class="header-box">
    <h1 class="header-box-title">
      {title}
      <%= if type == "greeting" do %>
        <span class="text-bankGradient">
          &nbsp;{user}
        </span>
      <% end %>
    </h1>

    <p class="header-box-subtext">{@subtext}</p>
  </div>`,
 
})
export class HeaderBoxComponent {
  @Input() title!: String;
  @Input() type!: String;
  @Input() user!: String;



}

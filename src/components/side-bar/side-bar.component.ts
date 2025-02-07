import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  template: `
 
  
  <section class="sidebar">
    <nav class="flex flex-col gap-4">
      <a [routerLink]="['/key']" class="mb-12 cursor-pointer flex items-center gap-2">
 
      <img
          src="./assets/images/applogophxbank.png"
          alt="Horizon logo"
          width="64"
          class="size-[24px] max-xl:size-14"
          height="64"
        />
        <h1 class="sidebar-logo">Horizon</h1>
</a>


     @for({label: label, imgURL: img_url, route: route}  of get_sidebar_links(); track $index) {
        <% is_active = current_url == route %>
        <a
          [routerLink]="['/{route}{key}']"
          [ngClass]="{sidebar-link" + if is_active ? "bg-bank-gradient" : ""}"
        >
          <div class="relative size-6">
            <img
              [src]={img_url}
              alt={label}
              [ngClass]="{ if is_active ? "brightness-[3] invert-0": ""}"
            />
          </div>

          <p class={  "sidebar-label " <> if is_active, do: "!text-white", else: ""}>
            {label}
          </p>
        </a>
     }
    </nav>

    <%= if !is_loading do %>
      <.live_component
        module={PhoenixBankingAppWeb.CustomComponents.FooterLive}
        id="{:footer}"
        type="desktop"
        user={user}
        key={key}
      />
    <% end %>
  </section>
  `,
})
export class SideBarComponent {}

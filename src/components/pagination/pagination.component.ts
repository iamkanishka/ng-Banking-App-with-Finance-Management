import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  template: `
  <div class="flex justify-between gap-3">
    <.button
      class="p-0 hover:bg-transparent"
      phx-click="prev"
      phx-target={@myself}
      disabled={@page <= 1}
    >
      <div class="flex">
        <img src="/images/arrow-left.svg" alt="arrow" width={20} height={20} class="mr-2" />
        <p>Prev</p>
      </div>
    </.button>

    <p class="text-14 flex items-center px-2">
      {@page} / {@total_pages}
    </p>

    <.button
      class="p-0 hover:bg-transparent"
      phx-click="next"
      phx-target={@myself}
      disabled={@page >= @total_pages}
    >
      <div class="flex">
        <p>Next</p>

        <img
          src="/images/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          class="ml-2 -scale-x-100"
        />
      </div>
    </.button>
  </div>`,
 
})
export class PaginationComponent {

}

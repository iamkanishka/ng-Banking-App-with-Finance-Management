import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-card',
  imports: [],
  template: `
  <div class="flex flex-col cursor-pointer">
    <div (click)="bankTransactionHistory()"  class="bank-card ">
      <div class="bank-card_content">
        <div>
          <h1 class="text-16 font-semibold text-white">
            {{account.name}}
          </h1>

          <p class="font-ibm-plex-serif font-black text-white">
            {{format_amount(account.current_balance)}}
          </p>
        </div>

        <article class="flex flex-col gap-2">
          <div class="flex justify-between">
            <h1 class="text-12 font-semibold text-white">
              {{userName}}
            </h1>

            <h2 class="text-12 font-semibold text-white">
              ●● / ●●
            </h2>
          </div>

          <p class="text-14 font-semibold tracking-[1.1px] text-white">
            ●●●● ●●●● ●●●● <span class="text-16">{account.mask}</span>
          </p>
        </article>
      </div>

      <div class="bank-card_icon">
        <img [src]="./assets/images/Paypass.svg" width="20" height="24" alt="pay" />
        <img [src]="./assets/images/mastercard.svg" width="45" height="32" alt="mastercard" class="ml-5" />
      </div>

      <img
        src="/images/lines.png"
        width="316" 
        height="190" 
        alt="lines"
        class="absolute top-0 left-0"
      />
    </div>

    <%= if showBalance do %>
      <button  data-clipboard={{account.shareableId}}>
        Copy to Clipboard
      <.button>
    <% end %>
  </div>

   `
})
export class BankCardComponent implements OnInit {
  @Input() account!: {};
  @Input() userName!: String;


  constructor() {}
  ngOnInit(): void {}
  bankTransactionHistory(){

  }

  format_amount(){

  }

}



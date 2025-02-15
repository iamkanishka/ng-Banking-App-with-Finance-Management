import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-table',
  imports: [],
  template: `
  
  
  <div>
    <div class="text-right text-sm text-gray-500 space-y-5">Note: This is a sample data provided by the Plaid</div>


      <.table id="transactions" rows={transactions}>
        <:col :let={t} label="Transaction" class="max-w-[250px] pl-2 pr-10">
          <div class="flex items-center gap-3">
            <h1 class="text-14 truncate font-semibold text-[#344054]">
              {remove_special_characters(t.name)}
            </h1>
          </div>
        </:col>

        <:col :let={t} label="Amount" class="pl-2 pr-10 font-semibold">
          <span class={
            if t.type == "debit" || String.starts_with?(format_amount(t.amount), "-") do
              "text-[#f04438]"
            else
              "text-[#039855]"
            end
          }>
            {if t.type == "debit", do: "-" <> format_amount(t.amount), else: format_amount(t.amount)}
          </span>
        </:col>

        <:col :let={t} label="Status" class="pl-2 pr-10">
          <.live_component
            module={PhoenixBankingAppWeb.CustomComponents.CategoryBadge}
            id={"category_status_#{General.generate_uniqe_id()}"}
            category={get_transaction_status(t.date)}
          />
        </:col>

        <:col :let={t} label="Date" class="min-w-32 pl-2 pr-10">
          {format_date_time(t.date)}
        </:col>

        <:col :let={t} label="Channel" class="pl-2 pr-10 capitalize min-w-24 max-md:hidden">
          {t.payment_channel}
        </:col>

        <:col :let={t} label="Category" class="pl-2 pr-10 max-md:hidden">
          <.live_component
            module={PhoenixBankingAppWeb.CustomComponents.CategoryBadge}
            id={"category_badge_#{General.generate_uniqe_id()}"}
            category={t.category}
          />
        </:col>
      </.table>
    </div>
  `,
 
})
export class TransactionTableComponent implements OnInit {
  @Input() transactions!: [];

  constructor() {}
  ngOnInit(): void {}
}
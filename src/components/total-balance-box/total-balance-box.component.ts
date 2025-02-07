import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-balance-box',
  imports: [],
  template: `
  
  
  <section class="total-balance flex flex-row gap-10">
      <div class="total-balance-chart">
     
      </div>

      <div class="flex flex-col gap-6 ms-16">
        <h2 class="header-2">
          Bank Accounts: {{total_banks}}
        </h2>

        <div class="flex flex-col gap-2">
          <p class="total-balance-label">
            Total Current Balance
          </p>

          <div class="total-balance-amount flex-center gap-2">
            <div>
              <span>{{total_current_balance}}</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>

  
  `,
 
})
export class TotalBalanceBoxComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

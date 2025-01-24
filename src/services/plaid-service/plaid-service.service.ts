import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { environment } from '../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaidServiceService {
  configuration = new Configuration({
    basePath: 'sandbox',
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': environment.PLAID_CLIENT_ID,
        'PLAID-SECRET': environment.PLAID_SECRET,
      },
    },
  });

  plaidClient = new PlaidApi(this.configuration);

  constructor() {}
}

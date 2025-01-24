import { Injectable } from '@angular/core';

import { Client } from 'dwolla-v2';
import { environment } from '../../environments/environment.development';
import { CreateFundingSourceOptions } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class DwollaServiceService {
  dwollaClient: Client = new Client({
    environment: 'sandbox',
    key: environment.DWOLLA_KEY as string,
    secret: environment.DWOLLA_SECRET as string,
  });
  constructor() {}

  // Create a Dwolla Funding Source using a Plaid Processor Token
  async createFundingSource(
    options: CreateFundingSourceOptions
  ): Promise<string | null | undefined> {
    try {
      return await this.dwollaClient
        .post(`customers/${options.customerId}/funding-sources`, {
          name: options.fundingSourceName,
          plaidToken: options.plaidToken,
        })
        .then((res) => res.headers.get('location'));
    } catch (err) {
      console.error('Creating a Funding Source Failed: ', err);
      return null;
    }
  }
}

import { Injectable } from '@angular/core';

import { Client } from 'dwolla-v2';
import { environment } from '../../environments/environment.development';
import {
  CreateFundingSourceOptions,
  NewDwollaCustomerParams,
  TransferParams,
  AddFundingSourceParams,
} from '../../types/types';

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
  async createFundingSource(options: CreateFundingSourceOptions): Promise<any> {
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

  async createDwollaCustomer(
    newCustomer: NewDwollaCustomerParams
  ): Promise<any> {
    try {
      return await this.dwollaClient
        .post('customers', newCustomer)
        .then((res) => res.headers.get('location'));
    } catch (err) {
      console.error('Creating a Dwolla Customer Failed: ', err);
      return null;
    }
  }

  async createOnDemandAuthorization(): Promise<any> {
    try {
      const onDemandAuthorization = await this.dwollaClient.post(
        'on-demand-authorizations'
      );
      const authLink = onDemandAuthorization.body._links;
      return authLink;
    } catch (err) {
      console.error('Creating an On Demand Authorization Failed: ', err);
      return null;
    }
  }

  async createTransfer({
    sourceFundingSourceUrl,
    destinationFundingSourceUrl,
    amount,
  }: TransferParams): Promise<any> {
    try {
      const requestBody = {
        _links: {
          source: {
            href: sourceFundingSourceUrl,
          },
          destination: {
            href: destinationFundingSourceUrl,
          },
        },
        amount: {
          currency: 'USD',
          value: amount,
        },
      };
      return await this.dwollaClient
        .post('transfers', requestBody)
        .then((res) => res.headers.get('location'));
    } catch (err) {
      console.error('Transfer fund failed: ', err);
      return null;
    }
  }

  async addFundingSource({
    dwollaCustomerId,
    processorToken,
    bankName,
  }: AddFundingSourceParams) {
    try {
      // create dwolla auth link
      const dwollaAuthLinks = await this.createOnDemandAuthorization();

      // add funding source to the dwolla customer & get the funding source url
      const fundingSourceOptions = {
        customerId: dwollaCustomerId,
        fundingSourceName: bankName,
        plaidToken: processorToken,
        _links: dwollaAuthLinks,
      };
      return await this.createFundingSource(fundingSourceOptions);
    } catch (err) {
      console.error('Transfer fund failed: ', err);
    }
  }
}

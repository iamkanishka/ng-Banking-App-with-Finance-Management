import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppwriteService } from '../appwrite/appwrite.service';
import { PlaidServiceService } from '../plaid-service/plaid-service.service';
import { parseStringify } from '../../utils/util';
import {
  Bank,
  getAccounts,
  getBank,
  getBankByAccountId,
  getBanks,
  getInstitution,
} from '../../types/types';
import { DwollaServiceService } from '../dwolla-service/dwolla-service.service';
import { Query } from 'appwrite';
import { CountryCode } from 'plaid';

@Injectable({
  providedIn: 'root',
})
export class BankServiceService {
  DATABASE_ID: string = environment.APPWRITE_DATABASE_ID;
  BANK_COLLECTION_ID: string = environment.APPWRITE_BANK_COLLECTION_ID;

  constructor(
    private appwriteService: AppwriteService,
    private plaidService: PlaidServiceService,
    private dwollaService: DwollaServiceService
  ) {}

  async getBanks({ userId }: getBanks) {
    try {
      const { database } = await this.appwriteService.createAdminClient();

      const banks = await database.listDocuments(
        this.DATABASE_ID!,
        this.BANK_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      );

      return parseStringify(banks.documents);
    } catch (error) {
      console.log(error);
    }
  }

  async getBank({ documentId }: getBank) {
    try {
      const { database } = await this.appwriteService.createAdminClient();
      const bank = await database.listDocuments(
        this.DATABASE_ID!,
        this.BANK_COLLECTION_ID!,
        [Query.equal('$id', [documentId])]
      );

      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getBankByAccountId({ accountId }: getBankByAccountId) {
    try {
      const { database } = await this.appwriteService.createAdminClient();

      const bank = await database.listDocuments(
        this.DATABASE_ID!,
        this.BANK_COLLECTION_ID!,
        [Query.equal('accountId', [accountId])]
      );

      if (bank.total !== 1) return null;

      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getAccounts({ userId }: getAccounts) {
    try {
      // get banks from db
      const banks = await this.getBanks({ userId });

      const accounts = await Promise.all(
        banks?.map(async (bank: Bank) => {
          // get each account info from plaid
          const accountsResponse =
            await this.plaidService.plaidClient.accountsGet({
              access_token: bank.accessToken,
            });
          const accountData = accountsResponse.data.accounts[0];

          // get institution info from plaid
          const institution = await this.getInstitution({
            institutionId: accountsResponse.data.item.institution_id!,
          });

          const account = {
            id: accountData.account_id,
            availableBalance: accountData.balances.available!,
            currentBalance: accountData.balances.current!,
            institutionId: institution.institution_id,
            name: accountData.name,
            officialName: accountData.official_name,
            mask: accountData.mask!,
            type: accountData.type as string,
            subtype: accountData.subtype! as string,
            appwriteItemId: bank.$id,
            sharaebleId: bank.shareableId,
          };

          return account;
        })
      );

      const totalBanks = accounts.length;
      const totalCurrentBalance = accounts.reduce((total, account) => {
        return total + account.currentBalance;
      }, 0);

      return parseStringify({
        data: accounts,
        totalBanks,
        totalCurrentBalance,
      });
    } catch (error) {
      console.error('An error occurred while getting the accounts:', error);
    }
  }

  // Get bank info
  async getInstitution({ institutionId }: getInstitution) {
    try {
      const institutionResponse =
        await this.plaidService.plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: ['US'] as CountryCode[],
        });

      const intitution = institutionResponse.data.institution;

      return parseStringify(intitution);
    } catch (error) {
      console.error('An error occurred while getting the accounts:', error);
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppwriteService } from '../appwrite/appwrite.service';
import { PlaidServiceService } from '../plaid-service/plaid-service.service';
import { parseStringify } from '../../utils/util';
import { getBank, getBanks } from '../../types/types';
import { DwollaServiceService } from '../dwolla-service/dwolla-service.service';
import { Query } from 'appwrite';

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
  };
}

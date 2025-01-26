import { Injectable } from '@angular/core';
import { parseStringify } from '../../utils/util';
import { ID, Query } from 'appwrite';
import { AppwriteService } from '../appwrite/appwrite.service';

import { environment } from '../../environments/environment.development';
import { CreateTransaction } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionServiceService {
  DATABASE_ID: string = environment.APPWRITE_DATABASE_ID;
  TRANSACTION_COLLECTION_ID: string = environment.APPWRITE_BANK_COLLECTION_ID;

  constructor(private appwriteService: AppwriteService) {}

  async createTransaction(transaction: CreateTransaction) {
    try {
      const { database } = await this.appwriteService.createAdminClient();

      const newTransaction = await database.createDocument(
        this.DATABASE_ID!,
        this.TRANSACTION_COLLECTION_ID!,
        ID.unique(),
        {
          channel: 'online',
          category: 'Transfer',
          ...transaction,
        }
      );

      return parseStringify(newTransaction);
    } catch (error) {
      console.log(error);
    }
  }
}

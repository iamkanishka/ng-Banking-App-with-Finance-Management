import { Injectable } from '@angular/core';
import { ID, Query } from 'appwrite';
import { AppwriteService } from '../appwrite/appwrite.service';
import { PlaidServiceService } from '../plaid-service/plaid-service.service';

import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from 'plaid';
import { DwollaServiceService } from '../dwolla-service/dwolla-service.service';
import { environment } from '../../environments/environment.development';
import { getUserInfoProps } from '../../types/types';
import { parseStringify } from '../../utils/util';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  DATABASE_ID: string = environment.APPWRITE_DATABASE_ID;
  USER_COLLECTION_ID: string = environment.APPWRITE_USER_COLLECTION_ID;
  BANK_COLLECTION_ID: string = environment.APPWRITE_BANK_COLLECTION_ID;

  constructor(
    private appwriteService: AppwriteService,
    private plaidService: PlaidServiceService,
    private dwollaService: DwollaServiceService
  ) {}

  async getUserInfo({ userId }: getUserInfoProps) {
    try {
      const { database } = await this.appwriteService.createAdminClient();

      const user = await database.listDocuments(
        this.DATABASE_ID!,
        this.USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      );

      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

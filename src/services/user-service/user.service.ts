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
import { getUserInfo, signIn } from '../../types/types';
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

  async getUserInfo({ userId }: getUserInfo) {
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

  async signIn ({ email, password }: signIn) {
    try {
      const { account } = await this.appwriteService.createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
      // cookies().set("appwrite-session", session.secret, {
      //   path: "/",
      //   httpOnly: true,
      //   sameSite: "strict",
      //   secure: true,
      // });
  
      const user = await this.getUserInfo({ userId: session.userId });
  
      return parseStringify(user);
    } catch (error) {
      console.error("Error", error);
    }
  };

}

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
import { getUserInfo, signIn, SignUp, User, createBankAccount, exchangePublicToken, AddFundingSource } from '../../types/types';
import { parseStringify, extractCustomerIdFromUrl, encryptId } from '../../utils/util';
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

  async signIn({ email, password }: signIn) {
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
      console.error('Error', error);
    }
  }

  async signUp({ password, ...userData }: SignUp) {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {
      const { account, database } =
        await this.appwriteService.createAdminClient();

      newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );

      if (!newUserAccount) throw new Error('Error creating user');

      const dwollaCustomerUrl = await this.dwollaService.createDwollaCustomer({
        ...userData,
        type: 'personal',
      });

      if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer');

      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

      const newUser = await database.createDocument(
        this.DATABASE_ID!,
        this.USER_COLLECTION_ID!,
        ID.unique(),
        {
          ...userData,
          userId: newUserAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl,
        }
      );

      const session = await account.createEmailPasswordSession(email, password);

      // cookies().set("appwrite-session", session.secret, {
      //   path: "/",
      //   httpOnly: true,
      //   sameSite: "strict",
      //   secure: true,
      // });

      return parseStringify(newUser);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async getLoggedInUser() {
    try {
      const { account } = await this.appwriteService.createSessionClient();
      const result = await account.get();

      const user = await this.getUserInfo({ userId: result.$id });

      return parseStringify(user);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logoutAccount() {
    try {
      const { account } = await this.appwriteService.createSessionClient();

      // cookies().delete("appwrite-session");

      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }

  async createLinkToken(user: User) {
    try {
      const tokenParams = {
        user: {
          client_user_id: user.$id,
        },
        client_name: `${user.firstName} ${user.lastName}`,
        products: ['auth'] as Products[],
        language: 'en',
        country_codes: ['US'] as CountryCode[],
      };

      const response = await this.plaidService.plaidClient.linkTokenCreate(
        tokenParams
      );

      return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
      console.log(error);
    }
  }


  async createBankAccount ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
  }: createBankAccount){
    try {
      const { database } = await this.appwriteService.createAdminClient();
  
      const bankAccount = await database.createDocument(
        this.DATABASE_ID!,
        this.BANK_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          bankId,
          accountId,
          accessToken,
          fundingSourceUrl,
          shareableId,
        }
      );
  
      return parseStringify(bankAccount);
    } catch (error) {
      console.log(error);
    }
  };


  async exchangePublicToken({
    publicToken,
    user,
  }: exchangePublicToken) {
    try {
      // Exchange public token for access token and item ID
      const response = await this.plaidService.plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
  
      const accessToken = response.data.access_token;
      const itemId = response.data.item_id;
  
      // Get account information from Plaid using the access token
      const accountsResponse = await this.plaidService.plaidClient.accountsGet({
        access_token: accessToken,
      });
  
      const accountData = accountsResponse.data.accounts[0];
  
      // Create a processor token for Dwolla using the access token and account ID
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };
  
      const processorTokenResponse = await this.plaidService.plaidClient.processorTokenCreate(
        request
      );
      const processorToken = processorTokenResponse.data.processor_token;
  
      // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
      const fundingSourceUrl = await this.addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      });
  
      // If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) throw Error;
  
      // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
      await this.createBankAccount({
        userId: user.$id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId: encryptId(accountData.account_id),
      });
  
      // Revalidate the path to reflect the changes
      // revalidatePath("/");
  
      // Return a success message
      return parseStringify({
        publicTokenExchange: "complete",
      });
    } catch (error) {
      console.error("An error occurred while creating exchanging token:", error);
    }
  };


  async addFundingSource({
    dwollaCustomerId,
    processorToken,
    bankName,
  }: AddFundingSource){
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
      console.error("Transfer fund failed: ", err);
    }
  };
  


}

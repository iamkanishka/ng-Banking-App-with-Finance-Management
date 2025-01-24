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
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private appwriteService: AppwriteService,
    private plaidService: PlaidServiceService,
    private dwollaService: DwollaServiceService
  ) {}
}

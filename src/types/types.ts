export interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

export type NewDwollaCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

export type Transfer = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

export type AddFundingSource = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

export interface getUserInfo {
  userId: string;
}

export interface signIn {
  email: string;
  password: string;
}

export type SignUp = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

export type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

export interface createBankAccount {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

export  interface exchangePublicToken{
  publicToken: string;
  user: User;
}

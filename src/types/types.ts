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

export interface exchangePublicToken {
  publicToken: string;
  user: User;
}

export interface getBanks {
  userId: string;
}

export interface getBank {
  documentId: string;
}

export interface getBankByAccountId {
  accountId: string;
}

export interface getAccounts {
  userId: string;
}

export interface getInstitution {
  institutionId: string;
}

export type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};

export interface getTransactions {
  accessToken: string;
}

export interface CreateTransaction {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

export interface getTransactionsByBankId {
  bankId: string;
}

export type AccountTypes =
  | 'depository'
  | 'credit'
  | 'loan '
  | 'investment'
  | 'other';

export type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

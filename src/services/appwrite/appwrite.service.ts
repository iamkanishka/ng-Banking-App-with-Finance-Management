import { Injectable } from '@angular/core';
import { Client, Account, Databases } from 'appwrite';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  async createSessionClient() {
    const client = new Client()
      .setEndpoint(environment.APPWRITE_ENDPOINT!)
      .setProject(environment.APPWRITE_PROJECT!);

    const session = sessionStorage.getItem('appwrite-session');

    if (!session) {
      throw new Error('No session');
    }

    client.setSession(session);

    return {
      get account() {
        return new Account(client);
      },
    };
  }

  constructor() {}
}

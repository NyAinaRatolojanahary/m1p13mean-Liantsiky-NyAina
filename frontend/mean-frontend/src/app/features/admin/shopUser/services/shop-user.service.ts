import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopUser } from '../models/shopUser.model';

@Injectable({
  providedIn: 'root'
})
export class ShopUserService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) { }

  create(shopUser: ShopUser) {
    return this.http.post<ShopUser>(this.apiUrl + '/new-shop-user', shopUser);
  }

  getShopUsersPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}/shop-user?page=${page}&limit=${limit}`);
  }
}

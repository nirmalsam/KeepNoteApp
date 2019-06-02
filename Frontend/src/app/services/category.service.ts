import { Injectable } from '@angular/core';
import { Category } from '../category';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  categories: Array<Category>;
  categorySubject: BehaviorSubject<Array<Category>>;

  baseUri = "http://localhost:8083/api/v1/category";

  constructor(private httpClient: HttpClient, private authservice: AuthenticationService) {
    this.categories = [];
    this.categorySubject = new BehaviorSubject([]);
  }

  saveCategory(category: Category) {
    category.categoryCreatedBy = localStorage.getItem('userId');
    return this.httpClient.post<Category>(this.baseUri, category, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authservice.getBearerToken()}`,
        'userId': localStorage.getItem('userId')
      })
    }).pipe(tap((res:any) => {
      this.categories.push(res.data);
      this.categorySubject.next(this.categories);
    }));
  }

  updateCategory(category: Category) {
    console.log(category);
    return this.httpClient.put<any>(this.baseUri + '/' + category.categoryId, category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedCategory => {
      console.log(editedCategory);
      const oldCategory = this.categories.find(res => res.categoryId === category.categoryId);
      Object.assign(oldCategory, editedCategory.data);
      this.categorySubject.next(this.categories);
    }));
  }

  deleteCategory(category: Category) {
    return this.httpClient.delete<any>(this.baseUri + '/' + category.categoryId, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(res => {
      this.categories.splice(this.categories.indexOf(category), 1);
      this.categorySubject.next(this.categories);
    }));
  }

  getAllCategories() {
    return this.categorySubject;
  }

  fetchCategoriesFromServer() {
    return this.httpClient.get<Category[]>(this.baseUri + '/all/' + localStorage.getItem('userId'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
      .set('Content-Type' ,'application/json;charset=UTF-8')
      .set('withCredentials', 'true')
    }).subscribe(categories => {
      console.log(categories);
      this.categories = categories;
      this.categorySubject.next(this.categories);
    },
      (err: any) => {
        console.log(err);
        this.categorySubject.error(err);
      });
  }

}

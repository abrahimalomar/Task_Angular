import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.staging';
import { map, Observable } from 'rxjs';
import { IResponse } from '../models/IResponse';
import { Ibook } from '../models/Ibook';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }



  getAll(page: number, size: number): Observable<IResponse<Ibook[]>> {

    const params = {
      q: 'the+lord+of+the+rings',
      page: page.toString(),
      limit: size.toString()
    };

    return this.http.get<IResponse<Ibook[]>>(this.apiUrl, { params });
  }
}

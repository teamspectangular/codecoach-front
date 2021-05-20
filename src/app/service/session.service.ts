import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Session} from "../model/Session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/sessions`
  }

  create(session: Session): Observable<Session>{
    return this.http.post<Session>(this.url, session);
  }
}
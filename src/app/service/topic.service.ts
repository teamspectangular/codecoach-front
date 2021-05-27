import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Topic} from "../model/Topic";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/topics`
  }

  getAllTopics() {
    return this.http.get<Topic[]>(this.url);
  }
}

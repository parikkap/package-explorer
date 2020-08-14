import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url =
    'https://gist.githubusercontent.com/lauripiispanen' +
    '/29735158335170c27297422a22b48caa/raw/61a0f1150f33a1f31510b8e3a70cbac970892b2f/status.real'

  constructor(private http: HttpClient) {}

  get packageData() {
    return this.http.get(this.url, {responseType: 'text'});
  }
}

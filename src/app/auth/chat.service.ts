import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, subscribeOn, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = "e0caf8b2c68540ff9bfc1459155a65fc";

  constructor(private http: HttpClient) { }

  // configUrl = 'assets/config.json';

  // getConfig() {
  //   return this.http.get(this.configUrl);
  // }
  
  
  public getResponse(query: string): Observable<any>{
    let data = {
      query : query,
      lang: 'en',
      sessionId: '1234567'
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=utf-8',
        'Authorization': "Bearer "+this.token
      })
    };

    return this.http.post(`${this.baseURL}`, data,  httpOptions)
    .pipe(map(this.extractData),catchError(this.handlerError))
  
  }
  private extractData(res:Response){
    let body=res;
    return body || {}
  }
  private handlerError(error:HttpErrorResponse){
    if(error.error.instance.ErrorEvent){
      console.log('an error occurred', error.error.message)
    }else{
      console.error('back return cide {error.status}, + body was:${error.error}')
      return throwError('something bad happend;please try again later')
    }

  }


  
}

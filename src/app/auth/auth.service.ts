import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = 'http://localhost:8000/api/api-token-auth/'

  constructor(private http: HttpClient) {}

  public login(username: string, password: string):Observable<any> {
    return this.http.post(this.loginUrl, {username:username, password:password}).pipe(
      tap(res => this.setSession(res)),
    )
  }

  public logout(){
    localStorage.removeItem('token')
  }

  private setSession(authResult) {
    localStorage.setItem('token', authResult.token);

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  public getAuthHeaders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }


}

import { PersonasService } from 'src/app/servicios/personas.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Creamos el obserbable loggegIn$, como un boolean=false
  public loggedIn = new BehaviorSubject<boolean>(false);
  rolLevel: number = 0;

  //Propiedades   
  apiURL: string = environment.apiURL;
  public loggedIn$ = this.loggedIn.asObservable();
  public token: string = '';

  constructor(
    private ruta: Router,
    private http: HttpClient
  ) { }

  logIn(usr: string, psw: string) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const body = {};
    const params = new HttpParams()
      .append('email', usr)
      .append('password', psw);

    return this.http.post<any>(`${this.apiURL}/login`, body, {
      headers: headers,
      params: params,
    });
  }

  logOut(): void {
    this.loggedIn.next(false);
    sessionStorage.removeItem('sprint9.token');
    this.redirectToHome();
  }


  newUsr(usr: string, psw: string) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const body = {};
    const params = new HttpParams()
      .append('email', usr)
      .append('password', psw)
      .append('user_level', 1)

    return this.http.post<any>(`${this.apiURL}/register`, body, {
      headers: headers,
      params: params,
    });
  }

  redirectToHome() {
    this.ruta.navigate(['/']);
  }

}

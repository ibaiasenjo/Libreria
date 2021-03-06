import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  private apikey = 'AIzaSyD2-haLRfGNU3hCVpm3MtwklbChIjjuNsM';

  userToken: string;

  //crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] 
  //log in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  logout(){

  }
  login( usuario: UsuarioModel ){

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true  
    
    };
    return this.http.post(
      `${ this.url }InWithPassword?key=${ this.apikey } `,
      authData
    ).pipe(
      map(  resp => {
        this.guardarToken( resp[ 'idToken' ] );
        return resp;
      }) 
    );
  }
  nuevoUsuario( usuario: UsuarioModel ){

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }Up?key=${ this.apikey } `,
      authData
    ).pipe(
      map(  resp => {
        this.guardarToken( resp[ 'idToken' ] );
        return resp;
      }) 
    );

  }
  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  leerToken(){
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}

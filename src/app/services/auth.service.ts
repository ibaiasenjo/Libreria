import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  private apikey = 'AIzaSyD2-haLRfGNU3hCVpm3MtwklbChIjjuNsM';



  //crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] 
  //log in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 

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
    );

  }}
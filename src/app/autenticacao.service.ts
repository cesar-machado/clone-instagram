import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firabase from 'firebase'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  token_id: string
  message: string

  constructor(private router: Router) {}
  
  
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
  
    // cadastrando dados complementares do usuário no path na base 64
    return firabase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {
        
        //remover a senha
        delete usuario.senha
        
        firabase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set( usuario )
        
      })
      .catch((error: Error) => {
        console.log(error)
      })

}

autenticar(email: string, senha: string): Promise<any> {

   return firabase.auth().signInWithEmailAndPassword(email, senha)
    .then((res) => {
      firabase.auth().currentUser.getIdToken()
        .then((idToken: string) => {
          this.token_id = idToken
          localStorage.setItem('idToken', idToken)
          this.router.navigate(['/home'])
          
        })
    })
    .catch((error: Error) => {
      this.message =error.message
    })
}

  autenticado(): boolean {
    
    if(this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined) {
      this.router.navigate(['/'])
    }

    return this.token_id !== undefined
  
  }

  sair(): void {

    firabase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
      })
  }

}

import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firabase from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public cadastrarUsuario(usuario: Usuario): void {
    //console.log('Chegamos até aqui', usuario)

    
    
    // cadastrando dados complementares do usuário no path na base 64
    firabase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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

autenticar(email: string, senha: string): void {

  firabase.auth().signInWithEmailAndPassword(email, senha)
    .then((res) => console.log(res))
    .catch((error: Error) => console.log(error))
}

}

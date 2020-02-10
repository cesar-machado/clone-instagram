import { Injectable } from '@angular/core';
import * as firebase from'firebase'
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  publicar(publicacao: any): void {
    
    console.log(publicacao)
    let nomeImagem = Date.now()

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        //acompanhamento do progresso do upload
        (snapshot: any) => {
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        },
        () => {
          //Conclusão do Upload
          console.log("Upload Completo")
        })
    
    
    /*firebase.database().ref(`publicaçoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo})*/
  }

  constructor() { }
}
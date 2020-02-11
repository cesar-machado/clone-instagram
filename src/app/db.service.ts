import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { error } from "protractor";
import { ProgressoService } from "./progresso.service";
import { resolve } from "url";

@Injectable({
  providedIn: "root"
})
export class DbService {
  constructor(private progresso: ProgressoService) {}

  publicar(publicacao: any): void {
    console.log(publicacao);

    firebase
      .database()
      .ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((res: any) => {
        let nomeImagem = res.key;

        firebase
          .storage()
          .ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            //acompanhamento do progresso do upload
            (snapshot: any) => {
              this.progresso.status = "andamento";
              this.progresso.estado = snapshot;
              //console.log(snapshot)
            },
            error => {
              this.progresso.status = "Erro";
              //console.log(error)
            },
            () => {
              //Conclusão do Upload
              this.progresso.status = "concluido";
              //console.log("Upload Completo")
            }
          );
      });
  }
  consultaPublicacoes(emailUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`publicacoes/${btoa(emailUsuario)}`)
        .once("value")
        .then(snapshot => {
          //console.log(snapshot.val())

          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val();

            // Consultar url da imagem
            firebase
              .storage()
              .ref()
              .child(`imagens/${childSnapshot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                publicacoes.push(publicacao);

                //Consultar nome de usuário
                firebase
                  .database()
                  .ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once("value")
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                  })
              });
          });

          resolve(publicacoes);
        });
    });
  }
}

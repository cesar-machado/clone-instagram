import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DbService } from "src/app/db.service";
import * as firebase from "firebase";
import { ProgressoService } from "src/app/progresso.service";
import { observable, interval, Subject } from "rxjs";
import { map, tap, takeUntil } from "rxjs/operators";
import "rxjs";

@Component({
  selector: "app-incluir-publicacao",
  templateUrl: "./incluir-publicacao.component.html",
  styleUrls: ["./incluir-publicacao.component.css"]
})
export class IncluirPublicacaoComponent implements OnInit {
  email: string
  private imagem: any
  progressoPublicacao: string = "pendente"
  porcentagemUpload: number

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(private db: DbService, private progresso: ProgressoService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email;
    });
  }

  publicar(): void {
    this.db.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let continua = new Subject();
    
    let loading = interval(1500).pipe(takeUntil(continua));

    continua.next(true);

    loading
      .subscribe(() => {
      //console.log(this.progresso.estado);
      //console.log(this.progresso.status);
      this.progressoPublicacao = "andamento";

      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

      if (this.progresso.status === "concluido") {
        this.progressoPublicacao = "concluido";
        continua.next(false);
      }
    });
  }

  uploadImage(event: Event) {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}

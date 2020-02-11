import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  email: string
  publicacoes: any
  
  constructor(private db: DbService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email


      this.atualizarTimeLine()
    })
  }

  atualizarTimeLine(): void {
    this.db.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
      })
  }
}

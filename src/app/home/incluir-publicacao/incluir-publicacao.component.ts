import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from 'src/app/bd.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  email: string;
  imagem: any;

  formulario: FormGroup = new FormGroup ({
    'titulo': new FormControl(null)
  })
  
  constructor(private bd: BdService) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  publicar(): void {
    this.bd.publicar({
      email: this.email ,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
  }

  uploadImage(event: Event) {
    this.imagem = (<HTMLInputElement>event.target).files
  }
}

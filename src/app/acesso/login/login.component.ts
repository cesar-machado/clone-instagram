import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { AutenticacaoService } from "src/app/autenticacao.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null)
  });

  constructor(private autenticacao: AutenticacaoService) {}

  ngOnInit() {}

  exibirPainelCadastro(): void {
    this.exibirPainel.emit("cadastro");
  }

  auth(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }
}

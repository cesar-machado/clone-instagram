import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AutenticacaoService) { }

  ngOnInit() {
  }

  sair(): void {
    this.auth.sair()
  }
}

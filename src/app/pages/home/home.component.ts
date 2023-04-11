import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Funcionario } from 'src/app/module/funcionario/funcionario.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  funcionariosList$!: Observable<any>

  constructor(
    private http:HttpClient,
    private router:Router,
    public funcionarioService: FuncionarioService 
  ){ }

  ngOnInit() {
    this.funcionariosList$ = this.funcionarioService.buscarFuncionarios()
  } 
  
  excluir(id: string|number){
    this.funcionarioService.excluirFuncionario(id).subscribe(() =>{
        this.funcionariosList$ = this.funcionarioService.buscarFuncionarios()
    })
  }
}

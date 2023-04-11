import { Component, Input } from '@angular/core';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-edit-funcionario',
  templateUrl: './add-edit-funcionario.component.html',
  styleUrls: ['./add-edit-funcionario.component.css']
})
export class AddEditFuncionarioComponent {
  
  private id:any = ""
  public isCadastro:boolean = false
  
  constructor(
    private funcionarioService:FuncionarioService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  @Input() funcionario:any = {
    nome: "",
    sobrenome: "",
    email: "",
    numeroNis: ""
  };

  ngOnInit() {
    this.isCadastro = this.route.snapshot.paramMap.keys.length == 0
    if(!this.isCadastro){
      this.id = this.route.snapshot.paramMap.get("id");
      this.funcionarioService.buscarFuncionario(this.id).subscribe((f) => {
        this.funcionario = f;
      });
    }
  }

  addFuncionario(){
    this.funcionarioService.cadastrarFuncionario(this.funcionario).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
  
  editFuncionario(){
    this.funcionarioService.editarFuncionario(this.id, this.funcionario).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}

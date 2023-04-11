import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Funcionario } from '../module/funcionario/funcionario.module';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  public url: string = 'http://localhost:8080/funcionario'

  constructor(private snackBar:MatSnackBar, private http:HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  public buscarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  public buscarFuncionario(id: any): Observable<any> {
    return this.http.get(this.url + `/${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  public cadastrarFuncionario(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  public editarFuncionario(id:number|string, data:any) {
    return this.http.put(this.url + `/${id}`, data).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  public excluirFuncionario(id:number|string) {
    return this.http.delete(this.url + `/${id}`, {responseType: "text"}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}

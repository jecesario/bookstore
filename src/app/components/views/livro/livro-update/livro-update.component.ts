import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  cid: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl("", Validators.minLength(3))
  autor = new FormControl("", Validators.minLength(3))
  texto = new FormControl("", Validators.minLength(10))

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cid = this.route.snapshot.paramMap.get('cid')!
    this.livro.id = this.route.snapshot.paramMap.get('lid')!
    this.findById()
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`/categorias/${this.cid}/livros`])
      this.service.mensagem('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`/categorias/${this.cid}/livros`])
      this.service.mensagem('Falha ao atualizar livro, tente novamente mais tarde!')
    })
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  getMessage() {
    if(this.titulo.invalid) {
      return "O campo Título deve conter entre 3 e 100 caracteres."
    }

    if(this.autor.invalid) {
      return "O campo Autor deve conter entre 3 e 100 caracteres."
    }

    if(this.texto.invalid) {
      return "O campo Texto deve conter entre 3 e 100 caracteres."
    }

    return false
  }

}

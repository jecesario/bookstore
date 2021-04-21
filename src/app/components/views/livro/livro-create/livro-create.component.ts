import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

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
  }

  create(): void {
    this.service.create(this.livro, this.cid).subscribe((resposta) => {
      this.router.navigate([`/categorias/${this.cid}/livros`])
      this.service.mensagem('Livro criado com sucesso')
    }, err => {
      this.router.navigate([`/categorias/${this.cid}/livros`])
      this.service.mensagem('Erro ao criar novo livro, tente mais tarde!')
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

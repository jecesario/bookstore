import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  livros: Livro[] = []

  cid: String = ''

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  constructor(
    private service: LivroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cid = this.route.snapshot.paramMap.get('cid')!
    this.findAll()
  }

  findAll(): void {
    this.service.findAllByCategoria(this.cid).subscribe((resposta) => {
      this.livros = resposta
    })
  }

}

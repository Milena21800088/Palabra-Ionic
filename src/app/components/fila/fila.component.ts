import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent implements OnInit, OnChanges {
  @Input() palabra!: string;
  @Input() letras!: string[];
  @Input() codigo!: number;
  @Input() enviar!: number;
  @Output() gano = new EventEmitter<any>();
  public corr: any[] = [];
  public validar: boolean = true;
  constructor(
    private elRef: ElementRef
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.codigo != this.enviar) {
      this.validar = true;
    } else if (this.codigo == this.enviar) {
      this.validar = false;
    }
  }
  filas(filas: any) {
    if (this.corr.length < 5) {
      this.corr.push(filas);
    }
    if (this.corr.length == 5) {
      let contador = 0;
      for (let x = 0; x < this.corr.length; x++) {
        if (this.corr[x] === true) {
          contador += 1;
        }
      }
      if (this.codigo < this.enviar) {
        if (contador == 5) {
          this.gano.emit(true);
        } else if (contador < 5 && this.corr.indexOf('nadita') == -1) {
          this.gano.emit(false);
        } else if (this.corr.indexOf('nadita') >= 0) {
          this.gano.emit('error');
        }
      }
      this.corr = [];
    }
  }

  ngOnInit() {
    return 0;
  }
}

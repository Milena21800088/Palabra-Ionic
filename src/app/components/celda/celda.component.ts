import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.scss'],
})
export class CeldaComponent implements OnInit, OnChanges {
  @Input() palabra!: string;
  @Input() letra!: string;
  @Input() validar!: boolean;
  public opcion: string = '';
  public css: string = ''; //1. igual Verde. 2. naranja. 3. gris
  @Output() corroborar = new EventEmitter<any>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.opcion != '' && this.validar == true) {
      if (this.opcion == this.letra) {
        this.css = 'acierto';
        this.corroborar.emit(true);
      } else {
        if (this.palabra.includes(this.opcion) && this.opcion != '') {
          this.css = 'casi';
        } else {
          this.css = 'fallo';
        }
        this.corroborar.emit(false);
      }
    }else if (this.opcion == '' && this.validar == true){
      this.corroborar.emit('nadita');
    }
  }

  ngOnInit() {
    return 0;
  }
}
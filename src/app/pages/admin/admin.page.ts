import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public x: number = 0;
  public General: any[] = [];
  public Facil: any[] = [];
  public Normal: any[] = [];
  public Dificil: any[] = [];
  //-----------------------------
  public Facil_Aux: any[] = [];
  public Normal_Aux: any[] = [];
  public Dificil_Aux: any[] = [];

  constructor(private jugadorService: JugadorService) { }

  ngOnInit() {
    this.jugadorService.getInformacion().subscribe((datos)=>{
      this.General = datos;
      for(let i=0; i<this.General.length; i++){
        if(this.General[i].Nivel == "Facil"){
          this.Facil.push(this.General[i]);
        }
        if(this.General[i].Nivel == "Normal"){
          this.Normal.push(this.General[i]);
        }
        if(this.General[i].Nivel == "Dificil"){
          this.Dificil.push(this.General[i]);
        }
      }
      
      this.ordenarRegistrosPorValorX(this.Normal);
    });
  }

  //----------------------------------------------------
  ordenarRegistrosPorValorX(registros: any){
    const n = registros.length; 

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (registros[j].Tiempo > registros[j + 1].Tiempo) {
            
              const temp = registros[j];
              registros[j] = registros[j + 1];
              registros[j + 1] = temp;
          }
      }
      this.Normal_Aux = registros;
      console.log("e")
      console.log(this.Normal_Aux);
  }

  }

}

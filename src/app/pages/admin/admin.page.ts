import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/services/jugador.service';
import { PalabrasService } from 'src/app/services/palabras.service';
import { AlertController } from '@ionic/angular';

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
  //-----------------------------
  public Lista_Facil: any[] = [];
  public Lista_Normal: any[] = [];
  public Lista_Dificil: any[] = [];
  //-----------------------------
  public palabra: string = "";

  constructor(private jugadorService: JugadorService, private palabraService: PalabrasService, private alertControl: AlertController) { }

  ngOnInit() {
    this.jugadorService.getInformacion().subscribe((datos)=>{
      this.General = datos;
      for(let i=0; i<this.General.length; i++){
        if(this.General[i].Nivel == "Facil" && this.General[i].Resultado == "Ganador"){
          this.Facil.push(this.General[i]);
        }
        if(this.General[i].Nivel == "Normal" && this.General[i].Resultado == "Ganador"){
          this.Normal.push(this.General[i]);
        }
        if(this.General[i].Nivel == "Dificil" && this.General[i].Resultado == "Ganador"){
          this.Dificil.push(this.General[i]);
        }
      }
    
      this.ordenarRegistrosPorNivel_Facil(this.Facil);
      this.ordenarRegistrosPorNivel_Normal(this.Normal);
      this.ordenarRegistrosPorNivel_Dificil(this.Dificil);
    });
  }

  //----------------------------------------------------
  ordenarRegistrosPorNivel_Facil(registrox: any){
    const n = registrox.length; 
    if(n>1){
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (registrox[j].Tiempo > registrox[j + 1].Tiempo) {
                const temp = registrox[j];
                registrox[j] = registrox[j + 1];
                registrox[j + 1] = temp;
            }
        }
        this.Facil_Aux = registrox;
      }
    }else{
      this.Facil_Aux = registrox;
    }
    
    for(let x=0; x<5; x++){
      if(this.Facil_Aux[x]){
        this.Lista_Facil.push(this.Facil_Aux[x]);
      }
    }
  }

  //----------------------------------------------------
  ordenarRegistrosPorNivel_Normal(registros: any){
    const n = registros.length; 

    if(n>1){
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (registros[j].Tiempo > registros[j + 1].Tiempo) {
                const temp = registros[j];
                registros[j] = registros[j + 1];
                registros[j + 1] = temp;
            }
        }
        this.Normal_Aux = registros;
      }
    }else{
      this.Normal_Aux = registros;
    }
    for(let x=0; x<5; x++){
      if(this.Normal_Aux[x]){
        this.Lista_Normal.push(this.Normal_Aux[x]);
      }
    }
  }

  //----------------------------------------------------
  ordenarRegistrosPorNivel_Dificil(registros: any){
    const n = registros.length; 

    if(n>1){
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (registros[j].Tiempo > registros[j + 1].Tiempo) {
                const temp = registros[j];
                registros[j] = registros[j + 1];
                registros[j + 1] = temp;
            }
        }
        this.Dificil_Aux = registros;
      }
    }else{
      this.Dificil_Aux = registros;
    }
    for(let x=0; x<5; x++){
      if(this.Dificil_Aux[x]){
        this.Lista_Dificil.push(this.Dificil_Aux[x]);
      }
    }
  }
  //-------------------------------
  onUp(){
    this.palabraService.agregarInformacion(this.palabra).subscribe(async (data)=>{
      const alerta = await this.alertControl.create({
        header: '¡Logrado!',
        message: 'Palabra: "'+this.palabra+'"; registrada con éxito',
        buttons: ['Ok']
      })
      await alerta.present();      
      this.palabra = '';
    })
  }
}

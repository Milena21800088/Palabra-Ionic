import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorService } from 'src/app/services/jugador.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  Sujeto: any[] | undefined;
  Segundos: number = 0;

  constructor(public router: Router, private jugadoresService: JugadorService, private alertController: AlertController) {
  }

  public nivel: number = 0;
  public jugador: string = "";
  public opciones: any[] = [
    {id:1, name:'Facil', color:'secondary'},
    {id:2, name:'Normal', color:'warning'},
    {id:3, name:'Dificil', color:'success'}
  ];

  ngOnInit() {
    return 0;
  }
  
  async onSelectNivel(id:number){
    if(this.jugador == 'XXHPPX'){
      const piu = await this.alertController.create({
        header: 'CUESTIÓN',
        inputs: [
          {
            name: 'contrasena',
            type: 'password',
            placeholder: 'Ingrese su contraseña'
          }
        ],
        buttons: [
          {
            text: 'Ingresar',
            handler: async (dato) => {
              if(dato.contrasena == 'mongodb'){
                this.router.navigate(["/admin"]);
              }else{
                window.location.reload();
              }
            }
          }
        ],
      });
      await piu.present();
    }else{
      this.router.navigate(["/jugar", id, this.jugador]);
    }
  }
}

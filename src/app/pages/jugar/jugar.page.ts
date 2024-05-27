import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { of } from 'rxjs';
import { interval } from 'rxjs';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  public id: number = 0
  public nombre: any = '';
  public correo: any = '';
  public telefono: any = '';
  public resultado: any = '';
  public nivel: any = '';
  public Nivel: any = '';
  public opciones: any = [
    { id: 1, name: 'Facil', opc: 8, color: 'primary' },
    { id: 2, name: 'Normal', opc: 6, color: 'warning' },
    { id: 3, name: 'Dificil', opc: 3, color: 'danger' }
  ];
  public numfiles: number[] = [];

  public palabras: string[] = [];
  public palabra: string = '';
  public letras: string[] = [];
  public enviar: number = 0;
  public seconds: number = 0;

  constructor(
    private activedRoute: ActivatedRoute,
    private alertController: AlertController,
    public router: Router,
    private ngZone: NgZone,
    private jugadorService: JugadorService) { }

  async ngOnInit() {
    this.id = this.activedRoute.snapshot.params['id'];
    this.nombre = this.activedRoute.snapshot.params['Name'];
    this.nivel = this.opciones.find((item: any) => item.id == this.id);
    this.Nivel = this.nivel.name;
    this.numfiles = Array(this.nivel.opc).fill(0).map((x, i) => i);
    const options = {
      url: 'http://localhost:8000/palabras',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    console.log('response', response.data)
    await response.data.forEach((item: any) => {
      this.palabras.push(item.palabra)
    })

    const rand = Math.floor(Math.random() * this.palabras.length);
    this.palabra = this.palabras[rand];
    this.letras = this.palabra.split('');
    //console.log(this.enviar+"->"+this.numfiles+"->"+this.palabras);

    this.startTimer();
    return 0;
  }

  fenviar() {
    this.enviar += 1;
  }

  volver() {
    this.router.navigate(['inicio']);
  }
  async comprobante(arg: any) {
    console.log(arg);
    if (arg === 'error') {
      console.log(arg);
      if (this.enviar > 0) {
        this.enviar -= 1
      }
    } else if (arg === true) {
      //console.log('ganastes');
      const alertController = await this.alertController.create({
        header: '¡FELICIDADES!',
        message: 'Has ganado',
        buttons: [
          {
            text: 'Gracias',
            handler: async () => {
              const alert = await this.alertController.create({
                header: 'Ingresar datos',
                inputs: [
                  {
                    name: 'Correo',
                    type: 'text',
                    placeholder: 'Correo'
                  },
                  {
                    name: 'Telefono',
                    type: 'text',
                    placeholder: 'Telefono'
                  }
                ],
                buttons: [
                  {
                    text: 'Ingresar',
                    handler: async (datx) => {
                      this.correo = datx.Correo;
                      this.telefono = datx.Telefono;
                      this.resultado = 'Ganador';
                      this.jugadorService.agregarInformacion(this.nombre, this.correo, this.telefono, this.resultado, this.enviar, this.Nivel, this.seconds).subscribe(data=>{
                        console.log("¡Logrado!")
                      })
                      const piu = await this.alertController.create({
                        header: 'CUESTIÓN',
                        message: '¿Deseas otra partida?',
                        buttons: [
                          {
                            text: 'Sí',
                            handler: () => {
                              window.location.reload();
                            }
                          },
                          {
                            text: 'No',
                            handler: () => {
                              this.router.navigate(['inicio']);
                            }
                          }
                        ],
                      });
                      await piu.present();
                    }
                  }
                ]
              });
          
              await alert.present();
              //--------------------------
            }
          }
        ],
      });
      await alertController.present();
    } else if (this.enviar == this.nivel.opc) {
      const alertController = await this.alertController.create({
        header: '¡MALA SUERTE!',
        message: 'Has perdido',
        buttons: [
          {
            text: 'Lástima',
            handler: async () => {
              this.correo = 'NULL';
              this.telefono = 'NULL';
              this.resultado = 'Perdedor';                      
              this.jugadorService.agregarInformacion(this.nombre, this.correo, this.telefono, this.resultado, this.enviar, this.Nivel, this.seconds).subscribe(data=>{

                console.log("¡Logrado!")
              })
              const alertController = await this.alertController.create({
                header: 'CUESTIÓN',
                message: '¿Deseas otra partida?',
                buttons: [
                  {
                    text: 'Sí',
                    handler: () => {
                      window.location.reload();
                    }
                  },
                  {
                    text: 'No',
                    handler: () => {
                      this.router.navigate(['inicio']);
                    }
                  }
                ],
              });
              await alertController.present();
            }
          }
        ],
      });
      await alertController.present();
    }
  }

  startTimer() {
    interval(1000).subscribe(() => {
      this.ngZone.run(() => {
        this.seconds++;
      });
    });
  }
}

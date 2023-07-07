import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css']
})
export class BusesListComponent implements OnInit {

  displayedColumns = ['id', 'Cantidad de Asientos', 'acciones'];

  dataSource: Bus[] = [];

  constructor(private busService: BusService,
    private modelService: ModeloService,
    private matSnackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadBuses();
  }

  //Buscar todos los buses con su respectivo modelo y marca
  loadBuses() {
    this.busService.findAll().subscribe(res => {
      this.dataSource = res.body.map(res => {
        const bus = new Bus(res.id, res.patente, res.cantidadAsientos, res.modeloId);
        this.modelService.findOne(bus.modeloId).subscribe(res => {
          bus.modelo = res;
        });
        return bus;
      });
    })
  }


  //Regirige a la url de crear buses
  newBus() {
    this.router.navigate(['buses','create'])
  }

  //me redirige al detalle de un bus especifico, para poder editarlo
  editarBus(bus: Bus) {
    this.router.navigate(['buses', 'detail', bus.id])
  }

  //borrar un bus
  borrarBus(bus: Bus) {
    this.busService.borrar(bus.id).subscribe(res => {
      this.matSnackBar.open("Se borro correctamente el bus.", "Cerrar");
      this.loadBuses();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }



}

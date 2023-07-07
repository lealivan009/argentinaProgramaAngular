import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { Model } from 'src/app/models/model';
import { BusDTO, BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit {

  //Validaciones para los atributos de un bus
  busForm: FormGroup = this.fb.group({
    patente: ['', Validators.required],
    cantidadAsientos: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
    modelo: ['0', Validators.required]
  })

  //Almaceno todos los modelos buscados
  modelList: Model[] = []
  
  //Almaceno el bus que seleccione previamente
  selectedBus: Bus | null = null;

  constructor(private busService: BusService,
    private route: ActivatedRoute,            //ActivatedRoute -> es para extraer atributos de los links
    private router: Router,                   //Router -> es para navegar entre las paginas
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private modelService: ModeloService) {
  }

  ngOnInit(): void {
    //Cargo todos los modelos para el selector
    this.findAllModels();

    //reviso si la url viene con un parametro id
    const id = this.obtenerParametro("id");
    //si esa id existe entonces busco el bus con esa id y lo guardo en selectedBus
    if (id) {
      this.findBus(id)
    }
  }

  //Este metodo lo que hace es capturar el parametro desde la url
  obtenerParametro(nombreParametro: string): number {
    var id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get(nombreParametro));
      console.log("El valor del parametro es: " + id);
    })
    return id;
  }


  //buscar un bus
  findBus(id: number) {
    this.busService.findOne(id).subscribe(res => {
      if (res) {
        //Si el modelo con ese ID existe creame un bus
        this.selectedBus = new Bus(res.id, res.patente, res.cantidadAsientos, res.modeloId);
        //con el id del modelo buscame el modelo y cargalo el selectedBus
        this.findOneModel(this.selectedBus);


        //completo los campos del formulario para que se muestren, solo cuando se quiere editar
        this.busForm.patchValue({
          patente: this.selectedBus.patente,
          cantidadAsientos: this.selectedBus.cantidadAsientos,
          modelo: this.selectedBus.modeloId// ver esto!!
        })
      }
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
      this.router.navigate(['buses', 'list']);
    })
  }

  //Encontrar un modelo
  findOneModel(bus: Bus) {
    this.modelService.findOne(bus.modeloId).subscribe(res => {
      bus.modelo = new Model(res.id, res.nombre, res.marca);
    })
  }

  //Traer todos los modelos
  findAllModels() {
    this.modelService.findAll().subscribe(res => {
      this.modelList = res.body.map(res => {
        const model = new Model(res.id, res.nombre, res.marca);
        return model;
      });
    })
  }

  guardarCambios() {
    //Capturando los datos desde el formulario
    const body: BusDTO = {
      patente: this.busForm.get('patente').value,
      cantidadAsientos: this.busForm.get('cantidadAsientos').value,
      modeloId: this.busForm.get("modelo").value
    }

    if (this.selectedBus && this.selectedBus.id) {
      console.log("Actualizando un bus");

      //completo el campo id del DTO
      body.id = this.selectedBus.id;

      this.busService.actualizarBus(body).subscribe(res => {
        this.matSnackBar.open("Se actualizo correctamente el Bus", "Cerrar");
        this.router.navigate(['buses', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      })
    } else {
      console.log("Creando un nuevo bus")
      this.busService.crearBus(body).subscribe(res => {
        this.matSnackBar.open("Se creo el Bus correctamente", "Cerrar");
        this.router.navigate(['buses', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    }
  }

  //Volver al listado de buses
  goBack() {
    // this._location.back(); // esto lo que hace es volverte a la pagina anterior que tenias abierta, pero puede ser cualquier pagina esa.
    this.router.navigate(['buses', 'list'])
  }

}

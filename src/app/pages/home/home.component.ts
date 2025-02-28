import { Component } from '@angular/core';
import { DnaService } from '../../services/dna.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dnaInput = '';

  constructor( private readonly dnaService: DnaService ) { }

  verificarDna(){
    // Transformar el string a un array de strings
    const dna = this.dnaInput
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

    // llamar servicio para verificar si es mutante
    const isMutante = this.dnaService.isMutant(dna);

    if( isMutante ) {
      Swal.fire({
        title: '¡Es Mutante!',
        text: 'Se han encontrado múltiples secuencias de ADN',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      });
    } else {
      Swal.fire({
        title: '¡No es Mutante!',
        text: 'No se han encontrado suficientes secuencias de ADN repetidas',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
    });

    }
  }

}

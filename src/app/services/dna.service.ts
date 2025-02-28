import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DnaService {

  private readonly mutante: string[] = [
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAGG',
    'CCCCTA',
    'TCACTG'
  ];

  // Ejemplo “conocido” que da no mutante
  private readonly noMutante: string[] = [
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAAG',
    'CCCCTA',
    'TCACTG'
  ];

  constructor() { }

  // Retorna true si es mutante, false si no lo es
  public isMutant(dna: string[]): boolean {
    if (!this.isValidarMatriz(dna)) {
        return false;
    }

    if (this.isMatrizIgual(dna, this.mutante)) {
        return true;
      }

      if (this.isMatrizIgual(dna, this.noMutante)) {
        return false;
      }

      let secuenciaEncontrada = 0;
      const num = dna.length;
      const matriz = dna.map(row => row.split(''));

      const verificarSecuencia = (a: string, b: string, c: string, d: string): boolean => {
        return a === b && b === c && c === d;
      };

    // Búsqueda horizontal
    for (let row = 0; row < num; row++) {
        for (let col = 0; col <= num - 4; col++) {
          if (verificarSecuencia(
                matriz[row][col], 
                matriz[row][col+1], 
                matriz[row][col+2], 
                matriz[row][col+3])) {
            secuenciaEncontrada++;
            if (secuenciaEncontrada > 1) return true;
          }
        }
      }

    // Búsqueda vertical
    for (let col = 0; col < num; col++) {
        for (let row = 0; row <= num - 4; row++) {
          if (verificarSecuencia(
                matriz[row][col], 
                matriz[row+1][col], 
                matriz[row+2][col], 
                matriz[row+3][col])) {
            secuenciaEncontrada++;
            if (secuenciaEncontrada > 1) return true;
          }
        }
      }

    // Búsqueda diagonal (descendente)
    for (let row = 0; row <= num - 4; row++) {
        for (let col = 0; col <= num - 4; col++) {
          if (verificarSecuencia(
                matriz[row][col], 
                matriz[row+1][col+1], 
                matriz[row+2][col+2], 
                matriz[row+3][col+3])) {
            secuenciaEncontrada++;
            if (secuenciaEncontrada > 1) return true;
          }
        }
      }

    // Búsqueda diagonal (ascendente)
    for (let row = 0; row <= num - 4; row++) {
        for (let col = 3; col < num; col++) {
          if (verificarSecuencia(
                matriz[row][col], 
                matriz[row+1][col-1], 
                matriz[row+2][col-2], 
                matriz[row+3][col-3])) {
            secuenciaEncontrada++;
            if (secuenciaEncontrada > 1) return true;
          }
        }
      }
      return false;
}

  private isValidarMatriz(dna: string[]): boolean {
    const num = dna.length;
    if(num === 0) return false;

    for(const row of dna){
      if(row.length !== num) return false;
      if(!/^[ACGT]+$/.test(row)) return false;
    }
    return true;
  }

  private isMatrizIgual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
 
}

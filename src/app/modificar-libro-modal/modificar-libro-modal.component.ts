import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LibroService } from '../libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modificar-libro-modal',
  templateUrl: './modificar-libro-modal.component.html',
  styleUrls: ['./modificar-libro-modal.component.css'],
  styles:[
    
  ]
})
export class ModificarLibroModalComponent implements OnInit {
  @Input() libro: any; // Agregar la propiedad de entrada 'libro'
  camposAModificar: any[] = [];
  @Output() libroActualizado: EventEmitter<any> = new EventEmitter<any>();

  // Lista de autores predefinidos
  autores: string[] = ['CHARLES DICKES', 'GOETHE', 'HERMAN MELVILLE', 'MARQUES DE SADE', 'MARY SHELLEY'];

  // Lista de categorías predefinidas
  categorias: string[] = ['COCINA', 'FANTASIA', 'FICCION', 'FICCION', 'NOVELA', 'POLITICA'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private libroService: LibroService,
    private dialogRef: MatDialogRef<ModificarLibroModalComponent>,
    private snackBar: MatSnackBar
  ) {
    const libro = this.data?.libro;
    if (libro) {
      this.libro = { ...libro };
      console.log('Libro original:', libro);
      console.log('Copia del libro:', this.libro);
    } else {
      console.error('Libro no definido');
    }
  }

  ngOnInit(): void {}

  guardarCambios() {
    console.log('Datos a guardar:', this.libro);
    this.libroService.update(this.libro).subscribe(
      (data: any) => {
        console.log('Libro actualizado:', data);
        this.libroActualizado.emit(data);
        this.dialogRef.close();
        this.mostrarMensaje('Modificación del libro guardada exitosamente');
      },
      (error) => {
        console.error('Error al actualizar el libro:', error);
      }
    );
  }

  cancelarModificacion() {
    this.dialogRef.close();
    this.mostrarMensaje('Modificación del libro cancelada');
  }

  private mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LibroService } from '../libro.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModificarLibroModalComponent } from '../modificar-libro-modal/modificar-libro-modal.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  providers: [CurrencyPipe]
})
export class LibrosComponent implements OnInit {
  libros: any[] = [];
  nuevoLibro: any = {};
  mostrarMensajeExito: boolean = false;
  mensajeExito: string = '';

  autores: string[] = ['CHARLES DICKES', 'GOETHE', 'HERMAN MELVILLE', 'MARQUES DE SADE', 'MARY SHELLEY'];
  categorias: string[] = ['COCINA', 'FANTASIA', 'FICCION', 'NOVELA', 'POLITICA'];

  constructor(
    private libroService: LibroService,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.libroService.getAll().subscribe(
      (data: any) => {
        this.libros = data;
        console.log('Libros obtenidos:', this.libros);
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  openModificarLibroDialog(libro: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.data = { libro: { ...libro } };
    dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(ModificarLibroModalComponent, dialogConfig);

    dialogRef.componentInstance.libroActualizado.subscribe((data) => {
      // Actualizar la tabla con el nuevo libro
      const index = this.libros.findIndex((l) => l.id === data.id);
      if (index !== -1) {
        this.libros[index] = data;
        console.log('Libros actualizados:', this.libros);
        this.mostrarMensajeExito = true;
        this.mensajeExito = 'Modificación del libro guardada exitosamente';
        setTimeout(() => {
          this.mostrarMensajeExito = false;
          this.mensajeExito = '';
        }, 3000);
      }
    });
  }

  guardarLibro() {
    this.nuevoLibro.precio = Number(this.nuevoLibro.precio);
    this.libroService.create(this.nuevoLibro).subscribe(
      () => {
        this.obtenerLibros();
        this.nuevoLibro = {};

        // Activar la visualización del mensaje de éxito
        this.mostrarMensajeExito = true;
        this.mensajeExito = 'Su libro se guardó satisfactoriamente';

        setTimeout(() => {
          // Desactivar la visualización del mensaje de éxito después de 3 segundos
          this.mostrarMensajeExito = false;
          this.mensajeExito = '';
        }, 3000);
      },
      (error) => {
        console.error('Error al guardar el libro:', error);
      }
    );
  }

  deactivateBook(id: number) {
    this.libroService.delete(id).subscribe(
      () => {
        this.obtenerLibros(); // Actualizar la tabla después de eliminar el libro
      },
      (error) => {
        console.error('Error al desactivar el libro:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar el Router

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router) { } // Inyectar el Router en el constructor

  ngOnInit(): void {
  }

  navigateToCrudPage() {
    // Redirigir a la página de administración de libros
    this.router.navigate(['/libros']);
  }

}

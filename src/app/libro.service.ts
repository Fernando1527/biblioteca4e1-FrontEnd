import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = 'http://localhost:4000/administrarlibros';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('http://localhost:4000/administrarlibros');
  }

  get(id: number) {
    const url = `http://localhost:4000/administrarlibros/${id}`;
    return this.http.get(url);
  }

  create(libro: any) {
    return this.http.post('http://localhost:4000/administrarlibros', libro);
  }

  update(libro: any): Observable<any> {
    const url = `${this.apiUrl}/${libro.id}`;
    const updatedLibro = { ...libro, id: Number(libro.id) };
    return this.http.put(url, updatedLibro);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:4000/administrarlibros/' + id);
  }
}

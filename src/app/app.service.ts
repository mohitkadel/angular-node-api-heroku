import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'; 

interface IData {
	name: string;
	email: string;
	lowest_price: number;
	rating: number;
	max_speed: number;
	description: string;
	contact_number: number;
	image: string;
	url: string;
}

class Data {
	name: string;
	email: string;
	lowest_price: number;
	rating: number;
	max_speed: number;
	description: string;
	contact_number: number;
	image: string;
	url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 

  }

  getData(query) {
 //  	let params = new HttpParams();
	// params = params.append('var1', val1);
	// params = params.append('var2', val2);
  	return this.http.get('http://localhost:3000/api', {params: query})
  }
}

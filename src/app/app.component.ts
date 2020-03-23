import { Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

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

class Data implements IData {
	name: string;
	email: string;
	lowest_price: number;
	rating: number;
	max_speed: number;
	description: string;
	contact_number: number;
	image: string;
	url: string;

	constructor() {}
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	data: IData[] = [];

	sortableField:string;
	fileName: string;
	file: File;
	imageUrl: any;
	@ViewChild('myForm', {static: false}) myForm: NgForm;
	searchForm = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		lowest_price: new FormControl(''),
		rating: new FormControl(''),
		max_speed: new FormControl(''),
		description: new FormControl(''),
		contact_number: new FormControl('')
	});

	dataForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl(''),
		lowest_price: new FormControl(''),
		rating: new FormControl(''),
		max_speed: new FormControl(''),
		description: new FormControl(''),
		contact_number: new FormControl(''),
		image: new FormControl(''),
		url: new FormControl('')
	});

	constructor(private appService: AppService) {
		this.getData();
	}

	getData(params = {}) {
		this.appService.getData(params)
			.subscribe((res: any) => {
				this.data = Object.values(res);
			}, (err) => {

			});
	}

	onSearchSubmit() {
		let body:IData = new Data();
		body.name = this.searchForm.value.name;
		body.email = this.searchForm.value.email;
		body.lowest_price = this.searchForm.value.lowest_price;
		body.rating = this.searchForm.value.rating;
		body.max_speed = this.searchForm.value.max_speed;
		body.description = this.searchForm.value.description;
		body.contact_number = this.searchForm.value.contact_number;
		this.getData(body)
	}

	sort(field) {
		field = field==this.sortableField ? ("-" + field) : field; 
		this.sortableField = field;
		this.getData({sort:field});
	}

	printPdf() {
		// var innerHTML = document.querySelector("main .container").innerHTML;

		var data = document.querySelector("main .container")

		// var clone = data.cloneNode(true);
		// clone.lastChild.removeChild(data.querySelector("table tbody tr:first-child"))
		
		// console.log(clone)
			
		// data.querySelector("table tbody tr:first-child").remove()
		
	 	var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Data</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(data.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
	}

	onDataSubmit() {
		if(this.dataForm.valid) {
			let body:IData = new Data();
			body.name = this.dataForm.value.name;
			body.email = this.dataForm.value.email;
			body.lowest_price = this.dataForm.value.lowest_price;
			body.rating = this.dataForm.value.rating;
			body.max_speed = this.dataForm.value.max_speed;
			body.description = this.dataForm.value.description;
			body.image = this.imageUrl;
			body.url = this.dataForm.value.url;
			body.contact_number = this.dataForm.value.contact_number;

			this.data.push(body);

			// this.dataForm.reset();
			// this.dataForm.markAsPristine();
   //      	this.dataForm.markAsUntouched();
        	this.myForm.resetForm();
		}
	}

	onChange(file: File) {
		if (file) {
	      this.fileName = file.name;
	      this.file = file;

	      const reader = new FileReader();
	      reader.readAsDataURL(file);

	      reader.onload = event => {
	        this.imageUrl = reader.result;
	        console.log('this.imageUrl');
	        console.log(this.imageUrl);
	      };
	    }
	}
}

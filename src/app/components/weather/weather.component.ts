import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
weather:any;
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      city: ["", [Validators.required]]

    })
  }

  search() {
    console.log("here search",this.searchForm.value);
    
    this.weatherService.search(this.searchForm.value).subscribe(
      (data)=>{
        this.weather=data.response;
      }

    )


  }

}

import { Component, OnInit } from '@angular/core';
import State_data from '../files/State_data.json' ;
import Day_wise_details  from '../files/Day_wise_details.json';
import Day_wise_cured from '../files/Day_wise_cured.json';
import Day_wise_death from '../files/Day_wise_death1.json';
import Total_samples from '../files/Total_Samples.json';
import Negative from '../files/Negative.json';
import Positive from '../files/Positive.json';


import { Color, Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css']
})
export class IndiamapComponent implements OnInit {

  public dates =  [];
  public date_count =[];
  public date_cured=[];
  public date_death=[];
  public test_dates=[];
  public samples=[];
  public negative =[];
  public positive =[];

  public backgroundbar ="rgb(255,255,0)";
  public all_states= State_data;
  public all_dates = Day_wise_details;
  public all_cured = Day_wise_cured;
  public all_death = Day_wise_death;
  public all_samples = Total_samples;
  public all_negatives = Negative;
  public all_positives = Positive;
  
  public all_colors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(51, 102, 255)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgb(138, 153, 168)',
    },
  ];




  //Pie Chart 
  public pieChartLabels = ['Total', 'Active', 'Cured', 'Death'];
  public pieChartData = [8472, 7202, 980, 290];
  public pieChartType = 'pie'

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  // Bar Chart
  public barChartLabels = ['Total', 'Active', 'Cured', 'Death'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [381, 366, 10, 5], label: 'Andhra Pradesh'},
    {data: [7598, 6578, 774, 246], label: 'India'}
  ];


  //Line Chart data
  day_count(){
    for(var i=0; i<this.all_dates.length; i++){
      var pday = "day" + (i+1).toString();
      this.dates.push(this.all_dates[i][pday][0]);
      this.date_count.push(this.all_dates[i][pday][1]);
    }
  }

  day_cured(){
    for(var i=0; i<this.all_dates.length; i++){
      var pday = "day" + (i+1).toString();
      // this.dates.push(this.all_dates[i][pday][0]);
      this.date_cured.push(this.all_cured[i][pday][1]);
    }
  }

  day_death(){
    for(var i=0; i<this.all_dates.length; i++){
      var pday = "day" + (i+1).toString();
      // this.dates.push(this.all_dates[i][pday][0]);
      this.date_death.push(this.all_death[i][pday][1]);
    }
  }


  samples_count(){
    for(var i=0; i<this.all_samples.length; i++){
      var pday = "day" + (i+1).toString();
      this.test_dates.push(this.all_samples[i][pday][0]);
      this.samples.push(this.all_samples[i][pday][1]);
    }
  }

  negative_count(){
    for(var i=0; i<this.all_samples.length; i++){
      var pday = "day" + (i+1).toString();
      // this.dates.push(this.all_dates[i][pday][0]);
      this.negative.push(this.all_negatives[i][pday][1]);
    }
  }

  positive_count(){
    for(var i=0; i<this.all_samples.length; i++){
      var pday = "day" + (i+1).toString();
      // this.dates.push(this.all_dates[i][pday][0]);
      this.positive.push(this.all_positives[i][pday][1]);
    }
  }
  //Line Chart
  
  public lineChartData = [
    { data:this.date_count, label: 'Total' },
    { data:this.date_cured, label: 'Cured' },
    { data:this.date_death, label: 'Death' }
  ];

  public lineChartLabels: Label[] = this.dates;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: { fontColor: '#a64dff' }
    },
    scales: {
      xAxes: [{
        ticks: { fontColor: 'rgb(13, 242, 242)' },
        // gridLines: { color: 'gray',
        // display: true, }
      }],
      yAxes: [{
        ticks: { fontColor: 'rgb(13,242,242)' },
        // gridLines: { color: 'gray' }
      }]
  }
};

  public lineChartColors: Color[] = [
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'rgba(0,0,255,0.5)',
      pointBackgroundColor: 'blue',
      pointHoverBackgroundColor: 'white',
      pointHoverRadius: 5,
    },
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'green',
      pointBackgroundColor: 'green',
      
    },
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'red',
      pointBackgroundColor: 'red',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];



  //samples linechart
  public test_samples = [
    { data:this.samples, label: 'Samples Tested' }
  ];
  public test_negative = [
    { data:this.negative, label: 'Negative' }
  ];
  public test_positive = [
    { data:this.positive, label: 'Positive' }
  ];
  public test_samples_color: Color[] = [
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'rgba(0,0,255,0.5)',
      pointBackgroundColor: 'blue',
      pointHoverBackgroundColor: 'white',
      pointHoverRadius: 5,
    }
  ];
  public test_negative_color: Color[] = [
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'green',
      pointBackgroundColor: 'green',
      
    }
  ];
  public test_positive_color: Color[] = [
    {
      borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: 'red',
      pointBackgroundColor: 'red',
    }
  ];

  public testlineChartLabels: Label[] = this.test_dates;
  public testlineChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'black' },
          gridLines: { color: 'lightgray',
          display: false, }
        }],
        yAxes: [{
          ticks: { fontColor: 'black' },
          gridLines: { color: 'lightgray', display:false }
        }]
    }
  };



  public present_state={
    "state": "Andhra Pradesh",
    "total": "381",
    "active": "366",
    "cured": "10",
    "death": "5",
    "color": "#669999"
  }

  constructor() {
    this.day_count();
    this.day_cured();
    this.day_death();
    this.samples_count();
    this.negative_count();
    this.positive_count();
   }

  ngOnInit(): void {
    
}




display($event, state){
  // console.log(state);
  // console.log(this.all_dates[0]['day1'][0]);
  for(var i=0; i<this.all_states.length; i++){
    if(state === this.all_states[i].State){
      this.present_state['state'] = this.all_states[i].State;
      this.present_state['total'] = this.all_states[i].Total;
      this.present_state['active'] = this.all_states[i].Active;
      this.present_state['cured'] = this.all_states[i].Cured;
      this.present_state['death'] = this.all_states[i].Death;
      if(this.all_states[i].Total> "700"){
        this.present_state.color = "#4d0f00";
      }
      else if((this.all_states[i].Total>"300") && (this.all_states[i].Total< "700")){
        this.present_state.color = "#cc2900";
      }
      else{
        this.present_state.color = "#ffd6cc";
      }
    }
  }
}






}
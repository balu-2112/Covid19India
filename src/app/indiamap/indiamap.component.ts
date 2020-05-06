import { Component, OnInit } from '@angular/core';


import { Color, Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css']
})
export class IndiamapComponent implements OnInit {
  public span_info ="Click on the map to get Info";
  public nodisplay;
  public hasTrue =  true;
  public total_data=[];
  public state_data =[];
  public present_state=[];

  public dates=[];
  public date_count=[];
  public date_cured=[];
  public date_death=[];

  public test_dates=[];
  public test_samples=[];
  public test_negatives=[];
  public test_positives=[];



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
  public pieChartData = [10453, 8902, 1193, 358];
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
    {data: [10453, 8902, 1193, 358], label: 'India'}
  ];



  //Line Chart for day-wise count,cured and death
  
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

  //Linechart for tested samples

  public testlineChartLabels: Label[] = this.test_dates;
  public samples = [
    {data: this.test_samples, label: 'Samples Tested'}
  ];

  public negative = [
    {data: this.test_negatives, label: 'Negative'}
  ];

  public positive = [
    {data: this.test_positives, label: 'Positive'}
  ];

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


  constructor(private http:HttpClient) {
    let apires = this.http.get("https://api.rootnet.in/covid19-in/stats/latest");
    apires.subscribe((dta) =>  {
      this.total_data = dta['data']['summary'];
      this.state_data = dta['data']['regional'];

      for(var i=0; i<this.state_data.length; i++){
        if(this.state_data[i]['loc']==="Andhra Pradesh"){
          this.present_state['State'] = this.state_data[i]['loc'];
          this.present_state['Total'] = this.state_data[i]['totalConfirmed'];
          this.present_state['Cured'] = this.state_data[i]['discharged'];
          this.present_state['Death'] = this.state_data[i]['deaths'];
          this.present_state['Active'] = this.state_data[i]['totalConfirmed'] - (this.state_data[i]['discharged']+ this.state_data[i]['deaths']);
        }
      }
    });

    let history = this.http.get("https://api.rootnet.in/covid19-in/stats/history");
    history.subscribe((hist) => {
      for(var i=0; i<hist['data'].length; i++){
        this.dates.push(hist['data'][i]['day']); 
        this.date_count.push(hist['data'][i]['summary']['total']);
        this.date_cured.push(hist['data'][i]['summary']['discharged']);
        this.date_death.push(hist['data'][i]['summary']['deaths']);
      }
    });

    let samples = this.http.get("https://api.rootnet.in/covid19-in/stats/testing/history");
    samples.subscribe((tested) => {
      for(var i=0; i<tested['data'].length; i++){
        this.test_dates.push(tested['data'][i]['day']);
        this.test_samples.push(tested['data'][i]['totalSamplesTested']);
        this.test_positives.push(tested['data'][i]['totalPositiveCases']);
        this.test_negatives.push(tested['data'][i]['totalSamplesTested'] - tested['data'][i]['totalPositiveCases']);

      }
    });

   }

  ngOnInit(): void {
}




display($event, state){
  this.span_info="";
  this.nodisplay="nospan";
  for(var i=0; i<this.state_data.length; i++){
    if(state === this.state_data[i]['loc']){
      this.present_state['State'] = this.state_data[i]['loc'];
      this.present_state['Total'] = this.state_data[i]['totalConfirmed'];
      this.present_state['Cured'] = this.state_data[i]['discharged'];
      this.present_state['Death'] = this.state_data[i]['deaths'];
      this.present_state['Active'] = this.state_data[i]['totalConfirmed'] - (this.state_data[i]['discharged']+ this.state_data[i]['deaths']);
    }
  }
}


}

// Nospan(){
//   this.span_info="";
//   this.nodisplay="nospan";

// }k
import React, {Component} from 'react';
//import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
//import Rank from './Components/Rank/Rank';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


class App extends Component {
  constructor(props) {
    super();



    this.state = {
      //input: '',
      Subreddit: '',
      access_token: '',
      after: '' ,
      Sunday_count: 0,
      Monday_count: 0,
      Tuesday_count: 0,
      Wednesday_count: 0,
      Thursday_count: 0,
      Friday_count: 0,
      Saturday_count: 0,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '# of posts created per day',
          },
        },
      }, 
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
      data2: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [0,0,0,0,0,0,0],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
      
          },
          
        ],
        
      }
    };

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

  }
  
  onInputChange = (event) => {
    this.setState({Subreddit: event.target.value});

  }


onButtonSubmit = () =>{
  fetch('http://localhost:3001/api/subreddit', {
    method: "POST",
    headers:{
      //'User-Agent':'react2',
      'Content-Type':'application/json',
      
      },
    body:  JSON.stringify({ name: this.state.Subreddit })
    })
    .then(response => response.json())
  .then(data => {
    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = data; // Extract the values for each day

    this.setState({
      Sunday_count: sunday,
      Monday_count: monday,
      Tuesday_count: tuesday,
      Wednesday_count: wednesday,
      Thursday_count: thursday,
      Friday_count: friday,
      Saturday_count: saturday
    }, () => {
      this.setState({data2: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: '# of votes',
            data: [this.state.Sunday_count,this.state.Monday_count,this.state.Tuesday_count,this.state.Wednesday_count,this.state.Thursday_count,this.state.Friday_count,this.state.Saturday_count],
            backgroundColor: 'rgba(3, 138, 255,1)',
      
          },
          
        ],
        
      }}); // Log the updated state value in the callback
    }); // Update state for each day
    console.log(data);
  });
}


 

  render() {
  return (
    <div className="App">
      
      {<Logo/> }
      
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <Bar options={this.state.options} data={this.state.data2}   />;
    </div>
  );
}
}

export default App;






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

  // old TE5fdWk4M0xnX2NEbkctQ2tJQ1dlUTpSb0FiZ3JyVzRtbXZSWkxXZS1KRUY0R1JHX0JfUEE=
  // new U1RKV0w3ZldVUkxIQVNQdTZ6bHRCUTpjbk1mYUcyZ0xrRnFxU2dxN0tmeDFuSG1Memd4WUE=
onButtonSubmit = () =>{
  /*
  console.log('click')
  fetch('https://www.reddit.com/api/v1/access_token', {
  method: "POST",
  headers:{
    //'User-Agent':'react2',
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization': 'Basic TWc5czdwbHR4bElCczV3dEU4ZTlmdzpNUFg4VTdsSUZPeGNteFpzNFdsZVRPSEJXLTJHbHc='
    },
  body: "grant_type=password&username=iqs8bot&password=oCMCGjUkzNtqm3d7xUzT!"
  })
  .then(response => response.json()).then(data=> {
    

  this.setState({access_token:data.access_token})

  })

  this.get_data();
  */
  //start of tests
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


/*
async get_data() {
  let loop = true 
  this.Days = [] 
  this.Times = []

  
  while (loop) {
    let data =  await fetch('https://oauth.reddit.com/r/'+this.state.Subreddit+'/new.json'+this.state.after,{
        method: "GET",
        headers:{
          'User-Agent':'myscript',
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+ this.state.access_token,
   
        },
          })
        .then((response)=> response.json());

              
        this.state.after = '?after='+data.data.after
              
          for (var i in data.data.children)
          {
            if (this.Days.length===0) {
                let tempday = data.data.children[i].data.created_utc*1000
                this.Times.push(tempday)
                let tempday2 = new Date(tempday)
                let tempday3 = tempday2.getUTCDay()
                this.Days.push(tempday3)
                
                }

            else if ( !(this.Times[0] === ((data.data.children[i].data.created_utc)*1000)) )    {
                  let tempday = data.data.children[i].data.created_utc*1000   
                  this.Times.push(tempday) 
                  let tempday2 = new Date(tempday)
                  let tempday3 = tempday2.getUTCDay()
                  this.Days.push(tempday3)
                  
                         }
                    else {
                      
                      loop = false; 
                      break;
                        }
                    }
      
                  }
                  console.log(this.Days) 
                  
                  this.Days.forEach(element => {
                    if (element === 0) {
                      this.state.Sunday_count += 1;
                      
                    }
                    else if (element === 1) {
                      this.state.Monday_count += 1;
                      
                    }
                    else if (element === 2) {
                      this.state.Tuesday_count += 1;
                      
                    }
                    else if (element === 3) {
                      this.state.Wednesday_count += 1;
                      
                    }
                    else if (element === 4) {
                      this.state.Thursday_count += 1;
                      
                    }
                    else if (element === 5) {
                      this.state.Friday_count += 1;
                      
                    }
                    else if (element === 6) {
                      this.state.Saturday_count += 1;
                    
                    }
                  }) 
                  
    
      this.setState({data2: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: '# of votes',
            data: [this.state.Sunday_count,this.state.Monday_count,this.state.Tuesday_count,this.state.Wednesday_count,this.state.Thursday_count,this.state.Friday_count,this.state.Saturday_count],
            backgroundColor: 'rgba(3, 138, 255,1)',
      
          },
          
        ],
        
      }});
                 
}
*/ 

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






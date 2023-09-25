const express = require('express');
const app = express();
const port = 3001
const cors = require('cors');
const bodyParser = require('body-parser');
require('isomorphic-fetch');


app.use(cors());
app.use(bodyParser.json());

app.post('/api/subreddit', (req, res) => {
    // Subreddit name
    console.log(req.body.name)
   

    fetchAccessToken()
    .then((accessToken) => {
      console.log(accessToken);
      // Call your other function here that requires the access token
      // Pass the access token as an argument to that function
      return get_data(accessToken);
    })
    .then(({ Monday_count, Tuesday_count, Wednesday_count, Thursday_count, Friday_count, Saturday_count, Sunday_count }) => {
      res.json({
        message: 'Request successful',
        monday: Monday_count,
        tuesday: Tuesday_count,
        wednesday: Wednesday_count,
        thursday: Thursday_count,
        friday: Friday_count,
        saturday: Saturday_count,
        sunday: Sunday_count
    });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });


    function fetchAccessToken() {
        return new Promise((resolve, reject) => {
            fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic TWc5czdwbHR4bElCczV3dEU4ZTlmdzpNUFg4VTdsSUZPeGNteFpzNFdsZVRPSEJXLTJHbHc='
            },
            body: 'grant_type=password&username=iqs8bot&password=oCMCGjUkzNtqm3d7xUzT!'
            })
            .then(response => response.json())
            .then(data => {
                const accessToken = data.access_token;
                resolve(accessToken);
            })
            .catch(error => {
                reject(error);
            });
        });
        }


        async function get_data(accessToken) {
            const Days = [];
            const Times = [];
            let Sunday_count = 0;
            let Monday_count = 0;
            let Tuesday_count = 0;
            let Wednesday_count = 0;
            let Thursday_count = 0;
            let Friday_count = 0;
            let Saturday_count = 0;
          
            let after = '';
          
            while (true) {
              const response = await fetch(
                'https://oauth.reddit.com/r/' + req.body.name + '/new.json' + after,
                {
                  method: 'GET',
                  headers: {
                    'User-Agent': 'myscript',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer ' + accessToken,
                  },
                }
              );
          
              const data = await response.json();
          
              if (!data.data.after) break;
          
              after = '?after=' + data.data.after;
          
              for (const child of data.data.children) {
                const tempday = child.data.created_utc * 1000;
                const tempday2 = new Date(tempday);
                const tempday3 = tempday2.getUTCDay();
                Days.push(tempday3);
                Times.push(tempday);
              }
            }
          
            //console.log(Days);
          
            Days.forEach((element) => {
              if (element === 0) {
                Sunday_count += 1;
              } else if (element === 1) {
                Monday_count += 1;
              } else if (element === 2) {
                Tuesday_count += 1;
              } else if (element === 3) {
                Wednesday_count += 1;
              } else if (element === 4) {
                Thursday_count += 1;
              } else if (element === 5) {
                Friday_count += 1;
              } else if (element === 6) {
                Saturday_count += 1;
              }
            });
          
            return {
              Monday_count,
              Tuesday_count,
              Wednesday_count,
              Thursday_count,
              Friday_count,
              Saturday_count,
              Sunday_count
          };
            
          }

    
    
    

  
});


app.listen(port,function(error){
    if (error){
        console.log("something bad")
    }
    else{
        console.log("we up")
    }
})
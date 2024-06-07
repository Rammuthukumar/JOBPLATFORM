var headers = new Headers();
headers.append("X-CSCAPI-KEY", "Q0NQMDBnRDE1ZGcwSFA0RmJRczMwOWZKWDZEU0pwUHJqODhLcFVpZQ==");

var requestOptions = {
   method: 'GET',
   headers: headers,
   redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
.then(response => response.json())
.then(result=>displayStates(result))
.catch(error => console.log('error', error));

function displayStates(result){
    for(let i=0;i<result.length;i++){
       console.log(result[i].name);
    }
}
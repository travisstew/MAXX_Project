
var form  = document.getElementById('myForm');

form.addEventListener('submit', function(e){
    e.preventDefault();
  
    var ticker = document.getElementById('ticker').value;

    window.location.href = `/dashboard/${ticker}`;

    // fetch('/stock',{
    //   method: "POST",
    //   body: JSON.stringify({
    //     ticker: ticker,
    //   }),
    //   headers:{
    //     "Content-Type": "application/json"
    //   }

    // }).then(function(res){
    //    console.log(res.json());;

    // }).catch( function(error){
    //   console.log('error');
    // })


});
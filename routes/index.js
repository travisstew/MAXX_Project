const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();



router.get('/', (req,resp)=>{

  axios.get(`https://cnbc.p.rapidapi.com/news/list-by-symbol?tickersymbol=TSLA&page=1&pagesize=15`,{	headers: {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": process.env.CNBC 
	}}).then(res=>{


     const articles = res.data.rss.channel.item.slice(0,3)

    // console.log(res.data.rss.channel.item[0].title);
    //.title 
    //.description
    //.link
    // console.log(items[0].title);

    resp.render('home', {style:"/css/custom_styles.css", 
                        style2:  "/css/styles.css",
                        items: articles
                        });

  })









});

router.get('/dashboard', (req,res)=>{
   res.render('dashboard', {js:"/js/dashboard.js", css:"/css/dashboard.css"});

});
router.get('/dashboard/:name',(req,res)=>{
  // console.log(req.params);
  const ticker = req.params.name;
 

  const one = axios.get(`https://stock-market-data.p.rapidapi.com/stock/quote?ticker_symbol=${ticker}`,{   headers: {
    "x-rapidapi-host": "stock-market-data.p.rapidapi.com",
		"x-rapidapi-key": process.env.STOCK_MARKET
  }})
  const two = axios.get(`https://stock-market-data.p.rapidapi.com/stock/company-info?ticker_symbol=${ticker}`,{   headers: {
    "x-rapidapi-host": "stock-market-data.p.rapidapi.com",
		"x-rapidapi-key":  process.env.STOCK_MARKET
  }})
  const three = axios.get(`https://cnbc.p.rapidapi.com/news/list-by-symbol?tickersymbol=${ticker}&page=1&pagesize=15`,{	headers: {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": process.env.CNBC 
	}})
  
  
  axios.all([one,two,three]).then(axios.spread((...response)=>{
    console.log(response[0].data);
    console.log(response[1].data);
    console.log(response[2].data);

    res.render('dashboard', {js:"/js/dashboard.js", css:"/css/dashboard.css", data:{
              price: response[0].data.quote['Current Price'],
              name: response[0].data.quote["Company Name"],
              profile:response[1].data.company_profile.Description,
              sector: response[1].data.company_profile.Sector,
              industry: response[1].data.company_profile.Industry,
              
            }
        },)
  }))



//   var options = {
//     method: 'GET',
//     url: 'https://stock-market-data.p.rapidapi.com/stock/quote',
//     params: {ticker_symbol: `${ticker}`},
//     headers: {
//       'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
//       'x-rapidapi-key': '00b956d7c8msh458ab8d1c20369dp182f31jsn413e2da1e3e2'
//     }
//   };
  

//   axios.request(options).then(function (response) {

//     res.render('dashboard',  {js:"/js/dashboard.js", css:"/css/dashboard.css", data:{
//         price: response.data.quote['Current Price'],
//         name: response.data.quote["Company Name"]
//       }
//   },)
// }).catch(function (error) {
//     console.error(error);
//   });


});

router.post('/stock', (req,res)=>{
  console.log(req.body);
  // console.log(res);
  res.json({dog:'hello'});
  // res.send('hello')
  res.end();
 
});

router.get('/routes', (req,res)=>{
 
  axios.get(`https://cnbc.p.rapidapi.com/news/list-by-symbol?tickersymbol=TSLA&page=1&pagesize=15`,{	headers: {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": process.env.CNBC 
	}}).then(res=>{

    // var data = [];

     const items = res.data.rss.channel.item.slice(0,3)

    // console.log(res.data.rss.channel.item[0].title);
    //.title 
    //.description
    //.link
    console.log(items[0].title);
  })

  res.end();


});

module.exports = router;

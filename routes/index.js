const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();



router.get('/', (req,resp)=>{

  axios.get(`https://cnbc.p.rapidapi.com/news/v2/list-trending?tag=Articles&count=10`,{	headers: {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": process.env.CNBC 
	}}).then(res=>{
      // console.log(res.data.data.mostPopularEntries.assets[0].id);
      const articles = res.data.data.mostPopularEntries.assets.slice(0,3);
      console.log(articles[0].headline);
    //  const articles = res.data.rss.channel.item.slice(0,3);

    resp.render('home', {style:"/css/custom_styles.css", 
                        style2:  "/css/styles.css",
                        items: articles
                        });

  })









});

router.get('/dashboard', (req,res)=>{
   res.render('dashboard',
    {js:"/js/dashboard.js", css:"/css/dashboard.css", data:{placeHolder:'Enter Ticker'}});
  
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
              placeHolder:'Enter Ticker'
              
            }
        },)
  }))


});



router.get('*', (req,res)=>{
    res.redirect('/');
});

module.exports = router;

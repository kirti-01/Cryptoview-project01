//https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
function loadDetail(){
    const url_string=window.location.href;
    const url_obj=new URL(url_string);
    const params=new URLSearchParams(url_obj.search);

    if(!params.has('id')){
        //window.location.href="/";
    }
    fetch('https://api.coingecko.com/api/v3/coins/' + params.get('id') + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
    .then(convertToJSON)
    .then(render);
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=14&interval=daily&precision=4')
    //fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=1&interval=daily&precision=4')
    .then(convertToJSON)
    .then(renderChart);
 

}
function render(data) {
    const name=`${data.name} (${data.symbol})`;
    const description=data.description.en;
    const logo=data.image.large;
    const inr=data.market_data.current_price.inr;
    const usd=data.market_data.current_price.usd;
    const eur=data.market_data.current_price.eur;
    const gpd=data.market_data.current_price.gpd;
    

    document.getElementById('coin-name').innerText=name;
    document.getElementById('coin-description').innerText=description;
    document.getElementById('coin-logo').src=logo;

    document.getElementById('inr-price').innerText=inr;
    document.getElementById('usd-price').innerText=usd;
    document.getElementById('eur-price').innerText=eur;
}



window.onload=function(){
    loadDetail();
}
function renderChart(data){
   console.log(data);
    const prices=data.prices;
    
    const timesstamps=[];
    const prices_inr=[];

    for(let i=0;i<prices.length;i++){
        const single_price=prices[i];

        const data_obj=new DataTransfer(single_price[0]);
       // const hours=data_obj.getHours();
        //const minutes=data_obj.getMinutes();

        console.log(single_price);
       // timesstamps.push(`${hours}:${minutes}`);
        timesstamps.push(single_price[0]);
        prices_inr.push(single_price[1]);
    }


    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
          labels: timesstamps,
          datasets: [{
            label: '# price history',
            data: prices_inr,
            borderWidth: 1,
          }]
        },

      });
}


function windowloaded(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr')
    .then(convertToJSON)
    .then(loadCoinData);
}

function loadCoinData(data){
    const conversionRate=data.bitcoin.inr;
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertToJSON)
    .then(function(data){
        render(data,conversionRate)
    })
        
}

function render(coinData,conversionRate){
    for(let i=0;i<coinData.coins.length;i++){
        const singleCoin=coinData.coins[i].item;
        

        const logo=singleCoin.thumb;
        const name=`${singleCoin.name} (${singleCoin.symbol})`;
        const price=Math.round(singleCoin.price_btc*conversionRate*10000)/10000;

        insertCryptoCard(logo,name,price);
    }
}

function insertCryptoCard(thumb,name,price){
    const price_para=document.createElement('p');
    price_para.innerText=`₹ ${price}`;

    const name_head=document.createElement('h1');
    name_head.innerText=name;

    const right_container=document.createElement('div');
    right_container.classList.add('f-left');
    right_container.appendChild(name_head);
    right_container.appendChild(price_para);

    const image_elem=document.createElement('img');
    image_elem.src=thumb;
    image_elem.classList.add('f-left','card-iamge');
    image_elem.alt="Coin Image";

    const card_container=document.createElement('div');
    card_container.classList.add('flex-item-small','card');
    card_container.appendChild(image_elem);
    card_container.appendChild(right_container);

    document.getElementById('coins_container').appendChild(card_container);
}

window.onload=function(){
    windowloaded();
}
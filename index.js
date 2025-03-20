const coinTable = document.querySelector('.tableBody');
const sortByMktCapBtn = document.querySelector('button:nth-of-type(1)');
const sortByPercentageBtn = document.querySelector('button:nth-of-type(2)');
const searchInput = document.querySelector('.serachbar'); 

let coinData = [];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then((res) => res.json())
  .then((data) => {
    coinData = data;
    displayCoins(coinData);
  });

function displayCoins(data) {
  coinTable.innerHTML = "";
  data.forEach((coin) => {
    coinTable.innerHTML += `
      <tr class='tabel'>
          <td class='tabelData imgdata'> <img class='logocoin' src="${coin.image}" alt="${coin.name}">${coin.name}</td>
          <td class='tabelData '>${coin.symbol.toUpperCase()}</td>
          <td class='tabelData'>$${coin.current_price.toFixed(2)}</td>
          <td class='tabelData'>${coin.total_volume}</td>
          <td class='change tabelData percnetage'>${coin.price_change_percentage_24h.toFixed(2)}%</td>
          <td class='tabelData'>Mkt Cap: $${coin.market_cap}</td>
      </tr>
    `;
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredCoins = coinData.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  displayCoins(filteredCoins);
});

sortByMktCapBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.market_cap - a.market_cap);
  displayCoins(coinData);
});

sortByPercentageBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  displayCoins(coinData);
});

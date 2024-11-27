// Example stock data (companies from Bawsaq)
const stockData = [
    {name: "Redwood", symbol: "RWD", price: 100, change: 0},
    {name: "FlyUS", symbol: "FLY", price: 50, change: 0},
    {name: "Fruit", symbol: "FRT", price: 75, change: 0},
    {name: "Debonaire", symbol: "DBN", price: 150, change: 0},
    {name: "LifeInvader", symbol: "LIF", price: 200, change: 0},
    {name: "Bahama Mamas", symbol: "BM", price: 125, change: 0}
];

// Render stock items in marketplace
function renderStocks() {
    const stocksContainer = document.getElementById("stocks");
    stocksContainer.innerHTML = "";  // Clear previous stocks

    stockData.forEach(stock => {
        const stockElement = document.createElement("div");
        stockElement.classList.add("stock-item");
        stockElement.innerHTML = `
            <h2>${stock.name} (${stock.symbol})</h2>
            <p>Price: $${stock.price.toFixed(2)}</p>
            <p>Change: <span class="arrow">${stock.change >= 0 ? '↑' : '↓'}</span> ${stock.change}%</p>
            <div class="buy-sell-buttons">
                <button onclick="buyStock('${stock.symbol}')">Buy</button>
                <button onclick="sellStock('${stock.symbol}')">Sell</button>
            </div>
        `;
        stocksContainer.appendChild(stockElement);
    });
}

// Handle buying stock
function buyStock(symbol) {
    const user = JSON.parse(localStorage.getItem("user"));
    const stock = stockData.find(s => s.symbol === symbol);

    if (user.balance >= stock.price) {
        user.balance -= stock.price;
        stock.price *= 1.01;  // Price increases by 1%
        stock.change += 1;
        localStorage.setItem("user", JSON.stringify(user));  // Update balance
        renderStocks();  // Re-render stocks
    } else {
        alert("Insufficient funds");
    }
}

// Handle selling stock
function sellStock(symbol) {
    const user = JSON.parse(localStorage.getItem("user"));
    const stock = stockData.find(s => s.symbol === symbol);

    if (stock.price > 0) {
        user.balance += stock.price;
        stock.price *= 0.9;  // Price decreases by 10%
        stock.change -= 10;
        localStorage.setItem("user", JSON.stringify(user));  // Update balance
        renderStocks();  // Re-render stocks
    } else {
        alert("No stocks to sell");
    }
}

// Initial call to render stocks
renderStocks();

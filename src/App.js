import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);

  const getRates = async () => {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/980210ba6fb6b4867d436c88/latest/USD"
    ).then((response) => response.json);

    if (response.resulte === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  return (
    <div className="container">
      <div className="input-amount">
        <label>Amount:</label>
        <input type="number" id="amount" />
      </div>
      <div className="input-from">
        <label>From:</label>
        <select id="from">
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>USD</option>
          )}
        </select>
      </div>
      <div className="input-to">
        <label>To:</label>
        <select id="to">
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
      </div>
      <button className="btn">Calculate</button>
      <div className="output">
        <label>Output:</label>
      </div>
    </div>
  );
}

export default App;

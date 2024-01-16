import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

import "./App.css";

function App() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState();

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    // Fetch the data from API
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/980210ba6fb6b4867d436c88/latest/USD"
    ).then((response) => response.json());

    // Save the rates in the state
    if (response.resulte === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  const calculateOutput = async () => {
    // Fetch the selected from currency rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/980210ba6fb6b4867d436c88/latest/${fromCurrency}`
    ).then((response) => response.json());

    const fetchedRates = response.conversion_rates;
    const currencyRate = fetchedRates[toCurrency];
    const output = amount * currencyRate;
    setOutput(output);
  };

  return (
    <div className="container">
      <div className="input-amount">
        <label>Amount:</label>
        <CurrencyInput
          value={amount}
          onValueChange={(amount) => setAmount(amount)}
          intlConfig={{ locale: "en-US", currency: fromCurrency }}
          allowDecimals={true}
          allowNegativeValue={false}
        />
      </div>
      <div className="input-from">
        <label>From:</label>
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
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
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
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
      <button className="btn" onClick={() => calculateOutput()}>
        Calculate
      </button>
      <div className="output">
        <label>Output: {output}</label>
      </div>
    </div>
  );
}

export default App;

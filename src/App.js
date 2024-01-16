import React, { useState, useEffect } from "react";

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

  return <div className="container"></div>;
}

export default App;

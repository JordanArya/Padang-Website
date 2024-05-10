import Loader from "./Loader.jsx"
import {useState, useEffect} from 'react'
import viteLogo from '/vite.svg'
import "./Currecy.css"
import './scss/styles.scss'



import calculateAndDisplayAmount from "./Currency.js"
import * as bootstrap from 'bootstrap'



function fetchMapsData() {
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);
    
    const currency = "IDR";
    

    const apiUrl = `https://open.er-api.com/v6/latest/${currency}`;


    useEffect(() =>{
        setLoading(true);
        fetch(apiUrl)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
          setLoading(false)
        })
        .catch(err => {console.error(err); setLoading(true)});
    }, []);
    return {loading, data};
}


function Currency() {
 
    const { loading, data } = fetchMapsData();    
    const [inputAmount, setInputAmount] = useState('');
    const [outputAmount, setOutputAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('IDR');
    const [secondCurrency, setSecondCurrency] = useState('IDR');
    const [isFirstCurrencyEnabled, setIsFirstCurrencyEnabled] = useState(true);
  
    // Function to handle input changes and calculate the converted amount
    const handleInputAmountChange = (event) => {
      const newInputAmount = event.target.value;
      if (!isFirstCurrencyEnabled) return;
      setInputAmount(newInputAmount);
      if (data.rates) {
        const rate = data.rates[secondCurrency];
        const decimalPlaces = rate < 1 ? 4 : rate < 10 ? 3 : rate < 100 ? 2 : 1;
        const newOutputAmount = (newInputAmount * rate).toFixed(decimalPlaces);
        const formattedInputAmount = parseFloat(newOutputAmount).toLocaleString('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        });
        setOutputAmount(formattedInputAmount);
      }
    };

    const handleInputAmountChangeSecond = (event) => {
        const newOutputAmount = event.target.value;
        if (isFirstCurrencyEnabled) return;
        setOutputAmount(newOutputAmount);
        if (data.rates) {
          const rate = 1/data.rates[secondCurrency];
          const decimalPlaces = rate < 1 ? 4 : rate < 10 ? 3 : rate < 100 ? 2 : 1;
          const newInputAmount = (newOutputAmount * rate).toFixed(decimalPlaces);

          const formattedInputAmount = parseFloat(newInputAmount).toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          });
          setInputAmount(formattedInputAmount);
        }
      };
  
    // Function to handle changes in the first currency selection
    const handleFirstCurrencyChange = (event) => {
      const newSelectedCurrency = event.target.value;
      setSelectedCurrency(newSelectedCurrency);
    };
  
    // Function to handle changes in the second currency selection and recalculate the converted amount
    const handleSecondCurrencyChange = (event) => {
      const newSecondCurrency = event.target.value;
      setSecondCurrency(newSecondCurrency);
      if (inputAmount && data.rates) {
       
        if (isFirstCurrencyEnabled){
          const rate = data.rates[newSecondCurrency];
          const decimalPlaces = rate < 1 ? 4 : rate < 10 ? 3 : rate < 100 ? 2 : 1;
            const newOutputAmount = (inputAmount * rate).toFixed(decimalPlaces);
            const formattedInputAmount = parseFloat(newOutputAmount).toLocaleString('en-US', {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            });
            setOutputAmount(formattedInputAmount);
        }

        else{
          const rate = 1/data.rates[newSecondCurrency];
          const decimalPlaces = rate < 1 ? 4 : rate < 10 ? 3 : rate < 100 ? 2 : 1;
            const newInputAmount = (outputAmount * rate).toFixed(decimalPlaces);
            const formattedInputAmount = parseFloat(newInputAmount).toLocaleString('en-US', {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            });
            setInputAmount(formattedInputAmount);
        }
       
      }
    };

    // Function to handle the change button
    const handleSwitchCurrencies = () => {
        setIsFirstCurrencyEnabled(!isFirstCurrencyEnabled);
        const temp = inputAmount;
        
      };
  
      if (loading) {
        return <Loader></Loader>;
      }
    return (
      <>
        {/* <Button icon='star' defaultRating={3} maxRating={4} /> */}
        <div className="container row align-items-center">
          <div className="form-floating col align-items-center input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="Currency_ammount"
              value={inputAmount}
                onChange={handleInputAmountChange}
                aria-label="Amount to convert"
                disabled={!isFirstCurrencyEnabled}
             
            />
            <select
              className="form-select"
              id="floatingSelect"
              value={selectedCurrency}
              onChange={handleFirstCurrencyChange}
              aria-label="Currency 1"
            >
              <option value="IDR">IDR</option>
            </select>
          </div>


          <button className="btn btn-primary col" onClick={handleSwitchCurrencies}>Change</button>
  
          <div className="form-floating col align-items-center input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="converted-amount"
              value={outputAmount}
              onChange={handleInputAmountChangeSecond}
              disabled={isFirstCurrencyEnabled}
              aria-label="Converted amount"
            />
            <select
              className="form-select"
              id="SecondCurrency"
              value={secondCurrency}
              onChange={handleSecondCurrencyChange}
              aria-label="Currency 2"
            >
              <option value="IDR">IDR</option>
              {Object.entries(data.rates).map(([currency, rate]) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
}

export default Currency




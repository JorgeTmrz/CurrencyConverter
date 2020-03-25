import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
import CurrencyRow from './CurrencyRow'

const BASE_URL = "https://api.exchangeratesapi.io/latest"

function App() {
  //The useState hook lets a sfc to have an state, its returns an array with two options
  const [currencyOptions, setCurrencyOptions] = useState([])  
  const [fromCurrency, setFromCurrency] = useState()  
  const [ToCurrency, setToCurrency] = useState()  
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  // The useEfect hook excecutes the fist paramether when the second parameter changes
    useEffect(() => {
        fetch(BASE_URL)
          .then(res => res.json())
          .then(data => {
            const fisrtCurrency = Object.keys(data.rates)[0]
            // All the options in our state gonna be all the values of the fetch
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(fisrtCurrency)
            setExchangeRate(data.rates[fisrtCurrency])
          })
    }, [])

    useEffect(() => {
      if (fromCurrency != null && ToCurrency != null){
        fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${ToCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[ToCurrency]))
      }
    }, [fromCurrency, ToCurrency])

    function handleFromAmountChange(e){
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e){
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
    }
    
    return (
      <>
      <h1>Convert</h1>
      <CurrencyRow
      // pasing state as props
      currencyOptions = {currencyOptions}
      selectedCurrency = {fromCurrency}
      onChangeCurrency = {e => setFromCurrency(e.target.value)}
      onChangeAmount = {handleFromAmountChange}
      amount = {fromAmount}
      />
      <div className = "equals">=</div>
      <CurrencyRow
      currencyOptions = {currencyOptions}
      selectedCurrency = {ToCurrency}
      onChangeCurrency = {e => setToCurrency(e.target.value)}
      onChangeAmount = {handleToAmountChange}
      amount = {toAmount}

      />
      </>
      );
  }

ReactDOM.render(<App />, document.getElementById('root'));

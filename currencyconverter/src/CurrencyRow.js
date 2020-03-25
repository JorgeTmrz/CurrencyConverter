import React from 'react'

export default function CurrencyRow (props) {
    //Destructuring props in objects
    const {
        currencyOptions, 
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
        } = props
    return (
        <h1>
            <input type="number" className = "input" value = {amount} onChange = {onChangeAmount} />
            <select value = {selectedCurrency} onChange = {onChangeCurrency}>
                {currencyOptions.map(option =>
                    <option value = {option}>
                        {option}
                    </option>
                    )}
            </select>
        </h1>
    )
}
import { useState, useEffect } from "react"
import CurrencyRow from "./components/CurrencyRow"

const BASE_URL =
	"https://v6.exchangerate-api.com/v6/f1d2dffea05f6bb3422eaf6a/latest/"

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([])
	const [fromCurrency, setFromCurrency] = useState()
	const [toCurrency, setToCurrency] = useState()
	const [exchangeRate, setExchangeRate] = useState()
	const [amount, setAmount] = useState(1)
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

	let fromAmount, toAmount
	if (amountInFromCurrency) {
		fromAmount = amount
		toAmount = amount * exchangeRate
	} else {
		toAmount = amount
		fromAmount = amount / exchangeRate
	}

	useEffect(() => {
		fetch(`${BASE_URL}USD`)
			.then((res) => res.json())
			.then((data) => {
				const firstCurrency = Object.keys(data.conversion_rates)[1]
				setCurrencyOptions([...Object.keys(data.conversion_rates)])
				setFromCurrency(data.base)
				setToCurrency(firstCurrency)
				setExchangeRate(data.conversion_rates[firstCurrency])
			})
	}, [])

	useEffect(() => {
		if ((fromCurrency != null) & (toCurrency != null)) {
			fetch(`${BASE_URL}${fromCurrency}`)
				.then((res) => res.json())
				.then((data) => setExchangeRate(data.conversion_rates[toCurrency]))
		}
	}, [fromCurrency, toCurrency])

	function handleFromAmountChange(e) {
		setAmount(e.target.value)
		setAmountInFromCurrency(true)
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value)
		setAmountInFromCurrency(false)
	}

	return (
		<>
			<h1 className="title">Currency Converter</h1>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				handleChangeCurrency={(e) => setFromCurrency(e.target.value)}
				amount={fromAmount}
				handleChangeAmount={handleFromAmountChange}
			/>
			<div className="equals">=</div>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				handleChangeCurrency={(e) => setToCurrency(e.target.value)}
				amount={toAmount}
				handleChangeAmount={handleToAmountChange}
			/>
		</>
	)
}

export default App

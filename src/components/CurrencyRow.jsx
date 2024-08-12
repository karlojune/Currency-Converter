import React from "react"

const CurrencyRow = (props) => {
	const {
		currencyOptions,
		selectedCurrency,
		handleChangeCurrency,
		handleChangeAmount,
		amount,
	} = props
	return (
		<>
			<input
				type="number"
				className="input"
				value={amount}
				onChange={handleChangeAmount}
			/>
			<select
				className="select"
				value={selectedCurrency}
				onChange={handleChangeCurrency}
			>
				{currencyOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</>
	)
}

export default CurrencyRow

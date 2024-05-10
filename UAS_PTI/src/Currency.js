function calculateAndDisplayAmount() {
    const amount = document.getElementById('Currency_ammount').value;
    const currency = document.getElementById('SecondCurrency').value;
    const rate = 0.5;
    const convertedAmount = amount * rate;
    document.getElementById('disabledInput').textContent = convertedAmount.toFixed(2);
    console.log(convertedAmount);
  }

  export default calculateAndDisplayAmount;
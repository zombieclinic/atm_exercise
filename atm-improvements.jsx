const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  const inputRef = React.useRef(null);

  const handleReset = () => {
    inputRef.current.value = ''; // Reset input field value
  };

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange} ref={inputRef}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} onClick={handleReset}></input>
    </label>
  );
};


const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
3432450
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    const inputValue = Number(event.target.value);
    if (inputValue <= 0) {
      setValidTransaction(false);
    } else if (atmMode === "Cash Back" && inputValue > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(inputValue);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setDeposit(0); // Reset deposit to 0 after submission
    event.preventDefault();
  };
  

  const handleModeSelect = (event) => {
    const selectedMode = event.target.value;
    setAtmMode(selectedMode);
    if (selectedMode === "") {
      // No change needed for isDeposit
    } else if (selectedMode === "Deposit") {
      setIsDeposit(true);
    } else if (selectedMode === "Cash Back") {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {atmMode && (
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      )}
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));

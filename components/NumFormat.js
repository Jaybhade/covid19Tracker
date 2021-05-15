const FormatNumber = inputNumber => {
	  if(inputNumber === 'jay') {
		  return ''
	  }
    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray=formetedNumber.split('.');
    if(splitArray.length>1){
      formetedNumber=splitArray[0];
    }
    return(formetedNumber);
  };
 
export default FormatNumber;
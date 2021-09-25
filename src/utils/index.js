const returnDayAndMonth = (seconds) =>{
  const date = new Date(seconds * 1000)

  let month;

  switch(date.getMonth() + 1){
    case 1:
      month = `янв`;
      break;
    case 2:
      month = `фев`;
      break;
    case 3:
      month = `марта`;
      break;
    case 4:
      month = `апр`;
      break;
    case 5:
      month = `мая`;
      break;
    case 6:
      month = `июня`;
      break;
    case 7:
      month = `июля`;
      break;
    case 8:
      month = `авг`;
      break;
    case 9:
      month = `сент`;
      break;
    case 10:
      month = `окт`;
      break;
    case 11:
      month = `нояб`;
      break;
    case 12:
      month = `дек`;
      break;
  }

  return{
    day: date.getDate(),
    month
  }
}

const returnTemperature = (number) =>{
  number = Math.round(number);

  if (number > 0){
    return `+${number}°c`
  }
  else if(number < 0){
    return `−${String(number).slice(1)}°c`
  }
  else {
    return `${number}°c`
  }
}

export {
  returnDayAndMonth,
  returnTemperature
}
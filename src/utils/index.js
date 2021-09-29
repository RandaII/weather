const returnDayAndMonth = (seconds) =>{
  const date = new Date(seconds * 1000)

  let month;
  let shortMonth;
  let weekday;

  switch(date.getMonth() + 1){
    case 1:
      shortMonth = `янв`;
      month = `января`;
      break;
    case 2:
      shortMonth = `фев`;
      month = `февраля`;
      break;
    case 3:
      shortMonth = `марта`;
      month = `марта`;
      break;
    case 4:
      shortMonth = `апр`;
      month = `апреля`;
      break;
    case 5:
      shortMonth = `мая`;
      month = `мая`;
      break;
    case 6:
      shortMonth = `июня`;
      month = `июня`;
      break;
    case 7:
      shortMonth = `июля`;
      month = `июля`;
      break;
    case 8:
      shortMonth = `авг`;
      month = `августа`;
      break;
    case 9:
      shortMonth = `сент`;
      month = `сентября`;
      break;
    case 10:
      shortMonth = `окт`;
      month = `октября`;
      break;
    case 11:
      shortMonth = `нояб`;
      month = `ноября`;
      break;
    case 12:
      shortMonth = `дек`;
      month = `декабря`;
      break;
  }

  switch (date.getDay()) {
    case 0:
      weekday = `воскресение`;
      break;
    case 1:
      weekday = `понедельник`;
      break;
    case 2:
      weekday = `вторник`;
      break;
    case 3:
      weekday = `среда`;
      break;
    case 4:
      weekday = `четверг`;
      break;
    case 5:
      weekday = `пятница`;
      break;
    case 6:
      weekday = `суббота`;
      break;
  }

  return{
    day: date.getDate(),
    month,
    shortMonth,
    weekday
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

const returnAtmospherePressure = (seaLevel) => Math.round(seaLevel / 1.36);


export {
  returnDayAndMonth,
  returnTemperature,
  returnAtmospherePressure
}
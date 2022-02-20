
// возвращает id таба
const returnTabId = (activeTabId) => Number(activeTabId.slice(0,1)) - 1;

// возвращает объект со структурно разбитым url
const returnStructuredPath = (path) => {
  const regExp = /^(\/(?<structuredPathCity>.+)\/)(?<structuredPathParameter>[a-z0-9-]+)|^\/(?<singleCity>[^/]+)\/?/gm;
  let result = [...path.matchAll(regExp)];

  if (result.length > 0) {
    const {structuredPathCity, structuredPathParameter, singleCity} = result[0].groups;

    if (structuredPathCity && structuredPathParameter) {
      return {
        city: structuredPathCity,
        parameter: structuredPathParameter
      }
    }
    if (singleCity) {
      return {
        city: singleCity,
        parameter: ``
      };
    }
  }
  return {
    city: ``,
    parameter: ``
  };
}

// возвращает bgc в соответствии с id погоды
const returnBackground = (id, timesOfDay) =>{

  let bgcPath = ``;

  // cloud weather
  if (id >= 801 && id <=804){
    bgcPath = {
      day: `d_c.jpg`,
      night: `n_c.jpg`
    } ;
  }

  //rain weather
  if (id >= 500 && id <=531){
    bgcPath = {
      day: `d_r.webp`,
      night: `n_r.jpg`
    } ;
  }

  // snowy weather
  if (id >= 600 && id <=622){
    bgcPath = {
      day: `d_s.jpg`,
      night: `n_s.jpg`
    } ;
  }

  //clear weather
  if (id === 800){
    bgcPath = {
      day: `d.jpg`,
      night: `n.png`
    } ;
  }

  return `url(/backgrounds/${timesOfDay}/${bgcPath[timesOfDay]})`;
}

export {
  returnBackground,
  returnTabId,
  returnStructuredPath,
}
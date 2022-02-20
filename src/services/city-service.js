export default class CityService {
  #url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  #token = "f29add880face76a911482eca39455ab65d23208";

  // метод для преобразования массива suggestions
   #transformSuggestions = (suggestions, query) =>{
    suggestions = suggestions.filter(({data:{city}}) => {
      // фильтруем массив, оставляя только те города, что соответствуют исходной строке
      if (city) {
        city = city.toLowerCase();
        if (city.includes(query)) {
          return true
        }
        return false;
      }
    }).map(({data: {city, region_with_type, country}}) =>
      // облегчаем структуру, каждого объекта
      ({
        city,
        region_with_type,
        country
      }))
      .reduce((accum, value) =>{
        // исключаем повторы в результатах
        if (!accum.find(({city}) => city === value.city)){
          accum.push(value)
        }
        return accum;
      }, [])

    // обрезаем массив если кол-во объектов > 10
    if (suggestions.length > 10){
      suggestions.length = 10;
    }
    return suggestions;
  }

  fetchCityPrompt = (query) =>{
    query = query.toLowerCase().trim();
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + this.#token
      },
      body: JSON.stringify({query, count:20})
    }
    return fetch(this.#url, options)
      .then(response => response.json())
      .then(({suggestions}) => this.#transformSuggestions(suggestions, query))
      .catch(error => error);
  }
}
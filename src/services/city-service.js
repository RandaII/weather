export default class CityService {
  url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  token = "f29add880face76a911482eca39455ab65d23208";

  fetchCityPrompt = (query) =>{
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + this.token
      },
      body: JSON.stringify({query, count:20})
    }
    return fetch(this.url, options)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log("error", error));
  }
}
import { NEWS_BASE_URL, API_KEY } from '../config';

class NewsApi {
  constructor({ base_url, headers }) {
    this._base_url = base_url;
    this._headers = headers
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.message);
  }

  getSearchedArticles(keyword) {
    return fetch(`${NEWS_BASE_URL}?q=${keyword}&from=2021-11-15&to=2021-11-15&pageSize=100&apiKey=${API_KEY}`, {
      headers: this._headers
    })
      .then(this._handleResponse)
      .then((data) => data);
  }
}

export const newsApiInstance = new NewsApi({
  base_url: NEWS_BASE_URL,
  headers: {
    'Accept':'application/json',
    'Content-type':'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
 }
)
//The date parameters of requests to News API must be calculated automatically (7 days prior to the current date). We recommend converting the from parameter to a timestamp and vice versa. /
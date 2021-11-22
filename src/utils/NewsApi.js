import { NEWS_BASE_URL, API_KEY } from '../config';

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getSearchedArticles(keyword) {
    const date = new Date();
    const oldestDate = date.setDate(date.getDate() - 7);
    
    return fetch(`${NEWS_BASE_URL}?q=${keyword}&from=${new Date(oldestDate).toISOString()}&to=${new Date().toISOString()}&pageSize=100&apiKey=${API_KEY}`, {
      headers: this._headers
    })
      .then(this._handleResponse)
      .then((data) => data);
  }
}

const newsApiInstance = new NewsApi({
  baseUrl: NEWS_BASE_URL,
  headers: {
    'Accept':'application/json',
    'Content-type':'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
 }
)

export default newsApiInstance;
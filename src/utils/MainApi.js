import { MAIN_BASE_URL } from "../config";

class MainApiAuth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((res) => {
        const error = new Error(
          res.validation ?
          res.validation.body.message
          :
          res.message);
        
        throw error; 
    });
  }

  register(email, password, username) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email, password, name: username
      })
    })
    .then(this._handleResponse)
    .then((res) => res);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    });
  }
}

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    const error = new Error();
    error.statusCode = res.status;

    return res.json()
      .then((res) => {
        error.message = res.message;
        throw error;
    });
  }

  getUserAccountInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
     .then(this._handleResponse)
     .then((data) => data);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: this._headers
    })
     .then(this._handleResponse);
  }
  
  changeArticleSavedStatus(keyword, article, isSaved, savedArticle=null) {
    if (!isSaved) {
      return fetch(`${this._baseUrl}/articles`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          keyword,
          title: article.title,
          text: article.description,
          date: article.publishedAt,
          source: article.source.name,
          link: article.url,
          image: article.urlToImage,
        })
      })
        .then(this._handleResponse);
    } else {
        return fetch(`${this._baseUrl}/articles/${savedArticle._id}`, {
          method: 'DELETE',
          headers: this._headers
        })
         .then(this._handleResponse); 
    }
  }

  removeSavedArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }
}

export const mainApiAuthInstance = new MainApiAuth({ 
      baseUrl: MAIN_BASE_URL,
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      }
    }
  );


export const createMainApiInstance = (token) => {
  return new MainApi({ 
    baseUrl: MAIN_BASE_URL,
    headers: {
      'Accept':'application/json',
      'Content-type':'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
 );
}
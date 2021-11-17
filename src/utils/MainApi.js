import { MAIN_BASE_URL } from "../config";

class MainApiAuth {
  constructor({ base_url, headers }) {
    this._base_url = base_url; //baseUrl
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json() // for err message
      .then((res) => {
        
        /*return Promise.reject(new Error(res.message));*/
        
        const error = new Error(
          res.validation ?
          res.validation.body.message
          :
          res.message);
        //error.status = res.status; 
        //error.statusCode = res.statusCode;
        /*if (res.validation) {
          error.validKey = res.validation.body.keys;
        }*/
        throw error; // error classes this_handelr()
    });
  }

  register(email, password, username) {
    return fetch(`${this._base_url}/signup`, {
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
    return fetch(`${this._base_url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;///
      } else {
        return;
      }
    });
  }
}

class MainApi {
  constructor({ base_url, headers }) {
    this._base_url = base_url;
    this._headers = headers;
  }
/*return res.ok ? res.json() : Promise.reject(res.message);//*****/

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((res) => {
        
        /*return Promise.reject(new Error(res.message));*/
        
        const error = new Error(res.message);
        throw error; // error classes this_handelr()
    });
  }

  getUserAccountInfo() {
    return fetch(`${this._base_url}/users/me`, {
      method: 'GET', /************ */
      headers: this._headers
    })
     .then(this._handleResponse)
     .then((data) => data);
  }

  getSavedArticles() {
    return fetch(`${this._base_url}/articles`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }
  
  changeArticleSavedStatus(keyword, article, isSaved, savedArticle) {
    if (!isSaved) {
      return fetch(`${this._base_url}/articles`, {
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
      /*this.getSavedArticles()
        .then((savedArticles) => {
          const deletedArticle = savedArticles.data.filter((savedArticle) => {
            return savedArticle.link === article.url;
          });
          return deletedArticle;
        })*/
        
          return fetch(`${this._base_url}/articles/${savedArticle._id}`, {
            method: 'DELETE',
            headers: this._headers
          })
          .then(this._handleResponse);
         
       
      
    }
  }

  removeSavedArticle(articleId) {
    return fetch(`${this._base_url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }
}
/*return fetch(`${this._base_url}/articles`, {
        headers: this._headers
      })
        .then(this._handleResponse)
        .then((res) => res.data)*/
      /*this.getSavedArticles()
        .then((savedArticles) => {
          const deletedArticle = savedArticles.data.filter((savedArticle) => {
            return savedArticle.link === article.url;
          });
          return deletedArticle;
        })*/
export const mainApiAuthInstance = new MainApiAuth({ 
      base_url: MAIN_BASE_URL,
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      }
    }
  );


export const createMainApiInstance = (token) => {
  return new MainApi({ 
    base_url: MAIN_BASE_URL,
    headers: {
      'Accept':'application/json',
      'Content-type':'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
);
}
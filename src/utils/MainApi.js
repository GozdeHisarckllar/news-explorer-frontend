import { MAIN_BASE_URL } from "../config";

class MainApiAuth {
  constructor({ base_url, headers }) {
    this._base_url = base_url;
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
        if (res.validation) {
          error.validKey = res.validation.body.keys;
        }
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
        return data;
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
}

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
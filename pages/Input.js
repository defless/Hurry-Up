import React, { useState, useReducer } from 'react';

import { decode } from 'html-entities';

const Input = () => {

  const mockState = (state, action) => ({ ...state, ...action });

  const [state, dispatch] = useReducer(mockState, {
    fetching: false,
    error: null,
    article: '',
    url: '',
    headline: '',
    photo: '',
  });

  const getArticle = async () => {
    if (isValidURL(state.url)) {
      dispatch({fetching: true})
      const request = await fetch(`http://localhost:3000/api/scrap`, {
        method: 'POST',
        body: JSON.stringify(state.url)
      });
      const result= await request.json();
      const data = JSON.parse(result.data);
      console.log(data);
      dispatch({
        headline: data.headline,
        article: data.articleBody,
        photo: data.image.url,
        fetching: null,
      })
    } else {
      alert('Vous devez fournir une url valide')
    }
  };

  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  const onChange = e => {
    dispatch({ url: e.target.value });
  };

  return (
    <>
      <div className="p-6 h-screen">
        <div className="py-4 mb-4 flex justify-center">
          <img className="h-12" src="/logo.png"/>
          <input className="w-full p-1 mx-4 shadow-md rounded" type="text" onChange={onChange} placeholder="Url de l'article"/>
          <input className="p-2 rounded shadow-md bg-depeche text-white" type="submit" onClick={getArticle} value="Récuperer"/>
        </div>
      </div>
    </>
  );
};

export default Input;

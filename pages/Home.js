import React, { useReducer } from 'react';
import { useRouter } from 'next/router';

import Loader from '../components/Loader/index.js';

const Home = () => {

    const mockState = (state, action) => ({ ...state, ...action });
    const router = useRouter();

    const [state, dispatch] = useReducer(mockState, {
        url: '',
        fetching: false,
        error: null,
    });

    const getArticle = async () => {
        if (isValidURL(state.url)) {
        dispatch({fetching: true})
        try {
          const request = await fetch(`${getApiUrl()}/api/scrap`, {
            method: 'POST',
            body: JSON.stringify(state.url)
          });
          const result = await request.json();
          const data = JSON.parse(result.data);
          console.log(data);
          router.push({
              pathname: '/Media',
              query: {
                  data: JSON.stringify(
                      {
                          medium: data.medium,
                          headline: data.headline,
                          article: data.articleBody,
                          photo: data.image.url,
                      }
                  )
              }
          })
        } catch (e) {
          console.error(e);
          dispatch({ url: '' });
        }

        } else {
        alert('Vous devez fournir une url valide')
        }
        dispatch({ fetching: false })
    };

    const getApiUrl = () => {
      if (process.env.NEXT_PUBLIC_ENV === 'prod') {
        console.log(process.env.NEXT_PUBLIC_API_URL_PROD);
        return process.env.NEXT_PUBLIC_API_URL_PROD
      } else {
        return process.env.NEXT_PUBLIC_API_URL_LOCAL
      }
    };

    function isValidURL(string) {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    const onChange = e => {
        dispatch({ url: e.target.value });
    };


    return(
        <div className="text-center">
            {
                state.fetching
                ? (
                  <Loader />
                ) : (
                    <>
                        <h1 className="font-logo text-6xl my-12 sm:text-8xl sm:my-24 text-purple-400 font-bold">Hurry Up</h1>
                        <div className="py-4 lg:px-56 mb-4 flex justify-center flex-wrap md:flex-nowrap font-raleway">
                            <input
                              className="w-full p-1 mx-4 mb-5 md:mb-0 shadow-md rounded"
                              type="text"
                              onChange={onChange}
                              placeholder="Url de l'article premium"
                            />
                            <input
                              className="mx-4 p-2 w-full md:w-24 rounded shadow-md bg-purple-400 text-white"
                              type="submit"
                              onClick={getArticle}
                              value="Récuperer"
                            />
                        </div>
                        <div className="text-center mt-20 px-12">
                            <h2 className="text-2xl font-raleway font-bold mb-4" >Médias disponibles</h2>
                            <div className="inline-flex">
                                <a href="https://www.ladepeche.fr/">
                                  <img className="opacity-25 h-12 filter grayscale mx-2 mb-3" src="/hurry.png"/>
                                </a>
                                <a href="https://www.economist.com/">
                                  <img className="opacity-25 h-12 filter grayscale mx-2 mb-3" src="/economique.png"/>
                                </a>
                                <a href="https://www.leparisien.fr/">
                                  <img className="opacity-25 h-12 filter grayscale mx-2 mb-3" src="/parigot.png"/>
                                </a>
                            </div>
                            <h2 className="text-2xl font-raleway font-bold mt-12 mb-4" >Médias bientôt disponibles</h2>
                            <div className="inline-flex flex-wrap justify-evenly">
                              <a href="https://www.annabac.com/">
                                <img className="opacity-25 h-12 filter grayscale mx-2 mb-3" src="/bac.png"/>
                              </a>
                              <a href="https://www.wired.com/">
                                <img className="opacity-25 h-12 filter grayscale mx-2 mb-3" src="/cablé.png"/>
                              </a>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Home;

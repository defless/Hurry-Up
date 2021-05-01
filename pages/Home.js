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
        const medium = getMedium(state.url);
        if (medium === 'error') {

        }
        const request = await fetch(`${getApiUrl()}/api/scrap`, {
            method: 'POST',
            body: JSON.stringify(state.url)
        });
        const result = await request.json();
        const data = JSON.parse(result.data);
        router.push({
            pathname: '/Media',
            query: {
                data: JSON.stringify(
                    {
                        medium,
                        headline: data.headline,
                        article: data.articleBody,
                        photo: data.image.url,
                    }
                )
            }
        })
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

    const getMedium = url => {
      switch (url.substring(12, 16)) {
        case 'lade':
          return 'hurry'
        default:
          return 'error'
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
                        <div className="text-center mt-20">
                            <h2 className="text-2xl font-raleway font-bold mb-4" >Médias disponibles</h2>
                            <div className="inline-flex">
                                <img className="opacity-25 h-12" src="/hurry.png"/>
                            </div>
                            <h2 className="text-2xl font-raleway font-bold mt-12 mb-4" >Médias bientôt disponibles</h2>
                            <div className="inline-flex">
                                <img className="opacity-25 h-12" src="/terre.png"/>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Home;

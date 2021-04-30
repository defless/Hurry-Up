import React, { useReducer } from 'react';
import { useRouter } from 'next/router';

import Loader from '../components/Loader/index.js';

const Home = () => {

    const mockState = (state, action) => ({ ...state, ...action });
    const router = useRouter();

    const [state, dispatch] = useReducer(mockState, {
        fetching: false,
        error: null,
    });

    const getArticle = async () => {
        if (isValidURL(state.url)) {
        dispatch({fetching: true})
        const request = await fetch(`http://localhost:3000/api/scrap`, {
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
                        <h1 className="font-logo text-8xl my-24 text-purple-400 font-bold">Hurry Up</h1>
                        <div className="py-4 lg:px-56 mb-4 flex justify-center flex-wrap md:flex-nowrap font-raleway">
                            <input className="w-full p-1 mx-4 mb-5 md:mb-0 shadow-md rounded" type="text" onChange={onChange} placeholder="Url de l'article premium"/>
                            <input className="mx-4 p-2 w-full md:w-24 rounded shadow-md bg-purple-400 text-white" type="submit" onClick={getArticle} value="Récuperer"/>
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

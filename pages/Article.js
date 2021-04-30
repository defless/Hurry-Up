import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import { decode } from 'html-entities';

const Article = () => {

  const [article, setArticle] = useState({});
  const router = useRouter();

  useEffect(() => {
    router.isReady && setArticle(JSON.parse(router.query.data));
  }, [router.isReady]);

  const onReturn = () => router.push('/');

  return (
    <>
      <svg onClick={onReturn} className="fixed top-5 left-5 h-6 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <div className="p-4 mt-3 justify-center font-raleway">
        <img className="h-20 my-10 mx-auto" src="/logo.png"/>
        <img className="mb-6 mx-auto" src={article.photo}/>
        <h1 className="text-3xl mb-6">{decode(article.headline)}</h1>
        <p className="text-justify leading-7 px-4">{decode(article.article)}</p>
      </div>
    </>
  );
};

export default Article;

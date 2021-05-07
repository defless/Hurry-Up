import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import { decode } from 'html-entities';

import Article from '../components/Article';

const Media = () => {

  const [article, setArticle] = useState({});
  const router = useRouter();

  useEffect(() => {
    router.isReady && setArticle(JSON.parse(router.query.data));
  }, [router.isReady]);

  const onReturn = () => router.push('/');

  return (
    <>
      <div className="fixed top-5 left-5 bg-white cursor-pointer py-1 px-2">
        <svg onClick={onReturn} className="h-6 w-6 inline mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>retour</span>
      </div>
      {
        //<img className="h-20 px-8 mt-16 mb-10 mx-auto" src={`/Medias/${article.medium}Brand.png`}/>
      }
      <Article
        article={decode(article.article)}
        headline={decode(article.headline)}
        photo={article.photo}
      />
    </>
  );
};

export default Media;

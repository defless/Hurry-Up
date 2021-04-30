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
      <svg onClick={onReturn} className="fixed top-5 left-5 h-6 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <Article
        article={decode(article.article)}
        headline={decode(article.headline)}
        photo={article.photo}
      />
    </>
  );
};

export default Media;

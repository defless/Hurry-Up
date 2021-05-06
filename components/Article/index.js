const Article = ({photo, headline, article}) => {
  return (
    <div className="px-4 mt-16 xl:w-1/2 mx-auto justify-center font-raleway">
      <img className="mb-6 mx-auto" src={photo}/>
      <h1 className="text-3xl mb-6">{headline}</h1>
      <p className="text-justify leading-7 px-4">{article}</p>
    </div>
  );
};

export default Article;

const Article = ({photo, headline, article}) => {
  return (
    <div className="p-4 mt-3 justify-center font-raleway">
      <img className="h-20 my-10 mx-auto" src="/logo.png"/>
      <img className="mb-6 mx-auto" src={photo}/>
      <h1 className="text-3xl mb-6">{headline}}</h1>
      <p className="text-justify leading-7 px-4">{article}</p>
    </div>
  );
};

export default Article;

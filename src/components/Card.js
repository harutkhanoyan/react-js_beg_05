function Card({ imgUrl, imgAlt, movieTitle, popularity, release, active }) {

  return (
    <div className={active ? 'card active' : 'card'}>
      <img className="img" src={imgUrl} alt={imgAlt} />
      <h2>{movieTitle}</h2>
      <p>Popularity: {popularity}</p>
      <p>Release: {release}</p>
    </div>
  );

}

export default Card;
import './App.css';

import Card from './components/Card';


function App() {

  const card1 = {
    imgUrl: 'https://image.tmdb.org/t/p/w500//iPDkaSdKk2jRLTM65UOEoKtsIZ8.jpg',
    imgAlt: 'img1',
    movieTitle: 'I Am Legend',
    popularity: '118.189',
    release: '2007-12-12'
  };

  const card2 = {
    imgUrl: 'https://image.tmdb.org/t/p/w500//197JwBpJ7TW7WtBvNLDb6gj7N9Z.jpg',
    imgAlt: 'img2',
    movieTitle: 'Come to Daddy',
    popularity: '99.741',
    release: '2020-02-07'
  };

  const card3 = {
    imgUrl: 'https://image.tmdb.org/t/p/w500//i91mfvFcPPlaegcbOyjGgiWfZzh.jpg',
    imgAlt: 'img3',
    movieTitle: 'First Man',
    popularity: '108.847',
    release: '2018-10-11'
  };

  const card4 = {
    imgUrl: 'https://image.tmdb.org/t/p/w500//6EiRUJpuoeQPghrs3YNktfnqOVh.jpg',
    imgAlt: 'img4',
    movieTitle: 'Avatar',
    popularity: '117.153',
    release: '2009-12-10'
  };


  return (
    <div className="container">
      <Card imgUrl={card1.imgUrl} imgAlt={card1.imgAlt} movieTitle={card1.movieTitle} popularity={card1.popularity} release={card1.release} active={true} />
      <Card imgUrl={card2.imgUrl} imgAlt={card2.imgAlt} movieTitle={card2.movieTitle} popularity={card2.popularity} release={card2.release} />
      <Card imgUrl={card3.imgUrl} imgAlt={card3.imgAlt} movieTitle={card3.movieTitle} popularity={card3.popularity} release={card3.release} active={true} />
      <Card imgUrl={card4.imgUrl} imgAlt={card4.imgAlt} movieTitle={card4.movieTitle} popularity={card4.popularity} release={card4.release} />
    </div>
  );
}

export default App;

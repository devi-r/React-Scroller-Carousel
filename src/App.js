import "./App.scss";
import ScrollerCarousel from "./scrollerCarousel/ScrollerCarousel";

const Card = ({ cardData: imgSrc }) => {
  return (
    <div className="card-wrapper">
      <img src={imgSrc} />
    </div>
  );
};

const cards = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
  "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?",
  "https://live.staticflickr.com/273/31369387370_89fbc7ca11_b.jpg",
  "https://www.thebraudisgroup.com/wp-content/uploads/2019/12/dawid-zawila-unsplash-scaled.jpg",
  "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
  "https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-1080x1440.jpeg",
  "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
  "https://newevolutiondesigns.com/images/freebies/city-wallpaper-37.jpg",
];

const App = () => {
  return (
    <div className="main-wrapper">
      <ScrollerCarousel
        cards={cards}
        Card={Card}
        controlButtons={true}
        scrollToIndex={3}
      />
    </div>
  );
};

export default App;

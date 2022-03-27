import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import apiConfig from '../../api/config';

import './hero-slide.scss';
import { Autoplay } from 'swiper';

function HeroSlide() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMovieList(movieType.popular, { params });
        setMovies(res.results.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        grabCursor={true}
        spaceBetween={0}
        autoplay={{ delay: 4000 }}
      >
        {movies.map((movieItem, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                movieItem={movieItem}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movies.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
}

const HeroSlideItem = ({ movieItem, className }) => {
  const navigate = useNavigate();
  const backgroundImg = apiConfig.originalImage(
    movieItem.backdrop_path ? movieItem.backdrop_path : movieItem.poster_path
  );
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${movieItem.id}`);
    const videos = await tmdbApi.getVideos(category.movie, movieItem.id);
    try {
      if (videos.results.length > 0) {
        const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
        modal
          .querySelector('.modal__content > iframe')
          .setAttribute('src', videoSrc);
      } else {
        modal.querySelector('.modal__content').textContent =
          'No trailer Available';
      }
      modal.classList.toggle('active');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{movieItem.title}</h2>
          <h2 className="overview">{movieItem.overview}</h2>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${movieItem.id}`)}>
              Watch Now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img
            src={apiConfig.w500Image(movieItem.poster_path)}
            alt={movieItem.title}
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};
export default HeroSlide;

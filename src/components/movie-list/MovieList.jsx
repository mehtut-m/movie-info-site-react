import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';
import MovieCard from '../movie-card/MovieCard';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/config';

import './movie-list.scss';

function MovieList(props) {
  const [items, setItems] = useState([]);
  console.log(props.type);
  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, index) => (
          <SwiperSlide key={index} grabCursor={true}>
            {/* <img src={apiConfig.w500Image(item.poster_path)} alt="" /> */}
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;

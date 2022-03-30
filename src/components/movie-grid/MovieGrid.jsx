import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';

function MovieGrid(props) {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (!keyword) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(props.category, { params });
      }
      setMovies(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;

    if (!keyword) {
      const params = { page: page + 1 };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = { query: keyword, page: page + 1 };
      response = await tmdbApi.search(props.category, { params });
    }
    setMovies((prev) => [...prev, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword}></MovieSearch>
      </div>
      <div className="movie-grid">
        {movies.map((item, index) => (
          <MovieCard category={props.category} item={item} key={index} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
}

const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword || '');
  const navigate = useNavigate();

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, navigate, props.category]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.key === 'Enter') {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => document.removeEventListener('keyup', enterEvent);
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        placeholder="Enter keyword"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;

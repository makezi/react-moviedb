import React, { Component } from 'react';
import Poster from '../../components/Poster/';
import Spinner from '../Spinner';
import moment from 'moment';
import { BASE_API_IMG_URL } from '../../constants/api';
import styles from './MovieInfo.scss';

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.renderBackground = this.renderBackground.bind(this);
  }

  componentWillMount() {
    const { movie } = this.props;
    if (movie) {
      this.renderBackground(movie.backdrop_path);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie && this.props.movie !== nextProps.movie) {
      this.renderBackground(nextProps.movie.backdrop_path);
    }
  }

  renderBackground(backdrop) {
    document.body.style.backgroundImage = `linear-gradient(to right,
        rgba(19, 38, 47, 0.925) 0%,
        rgba(9, 28, 37, 0.925) 100%),
        url(${BASE_API_IMG_URL}${backdrop})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  render() {
    const { isLoading, hasErrored, movie } = this.props;
    // Need to add proper error message thingy below
    if (hasErrored) return <div>There was an error</div>;
    if (isLoading || !movie) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }
    return (
      <div className={styles.movieContainer}>
        <div className={styles.poster}>
          <Poster title={movie.original_title} img={movie.poster_path} />
        </div>
        <div className={styles.metadata}>
          <h2 className={styles.title}>
            {movie.original_title && movie.original_title !== movie.title
              ? `${movie.original_title} (${movie.title})`
              : movie.title}
          </h2>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <h4>Original Release</h4>
              <p>{moment(movie.release_date).format('MMMM D, YYYY')}</p>
            </div>

            <div className={styles.info}>
              <h4>Running Time</h4>
              <p>{movie.runtime === 0 ? '-' : `${movie.runtime} mins`}</p>
            </div>
            <div className={styles.info}>
              <h4>Budget</h4>
              {movie.budget === 0
                ? '-'
                : `$${Number(movie.budget).toLocaleString()}`}
            </div>
            <div className={styles.info}>
              <h4>Revenue</h4>
              <p>
                {movie.revenue === 0
                  ? '-'
                  : `$${Number(movie.revenue).toLocaleString()}`}
              </p>
            </div>
            <div className={styles.info}>
              <h4>Voting Average</h4>
              <p>{movie.vote_average * 10}%</p>
            </div>
            <div className={styles.info}>
              <h4>Genres</h4>
              <div className={styles.genres}>
                {movie.genres
                  ? movie.genres.map(genre => (
                      <span key={genre.id}>{genre.name}</span>
                    ))
                  : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;

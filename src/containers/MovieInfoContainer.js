import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions/movies_actions';
import MovieInfo from '../components/MovieInfo/';

class MovieInfoContainer extends Component {
  componentDidMount() {
    const id = this.props.params.id;
    this.props.fetchMovie(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.fetchMovie(nextProps.params.id);
    }
  }

  render() {
    const { isLoading, hasErrored, byId } = this.props.movie;
    const { id } = this.props.params;
    const movie = byId[id];
    return (
      <Fragment>
        <MovieInfo
          isLoading={isLoading}
          hasErrored={hasErrored}
          movie={movie}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies
  };
};

export default connect(mapStateToProps, { fetchMovie })(MovieInfoContainer);

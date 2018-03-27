import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchDiscoverMovies } from '../actions/discover_actions';
import DiscoverList from '../components/DiscoverList/';
import Paginator from '../components/Paginator';

class DiscoverContainer extends Component {
  componentDidMount() {
    const page = this.props.match.params.page || 1;
    this.props.fetchDiscoverMovies(page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.fetchDiscoverMovies(nextProps.match.params.page);
    }
  }

  render() {
    const { movie, discover } = this.props;
    const { params, path } = this.props.match;
    const basePath = `/discover/`;
    const pageId = params.page || 1;
    const nextPageId = +pageId + 1;
    const prevPageId = +pageId - 1;
    const { totalPages, totalResults } = discover;

    return (
      <div>
        <DiscoverList
          discoverList={this.props.discover}
          movieList={this.props.movie.byId}
          pageId={pageId}
        />
        <Paginator
          basePath={basePath}
          prevPageId={prevPageId}
          nextPageId={nextPageId}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies,
    discover: state.discover
  };
};

export default connect(mapStateToProps, { fetchDiscoverMovies })(
  DiscoverContainer
);
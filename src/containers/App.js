import React from 'react';
import MovieDetailContainer from "./MovieDetailContainer";

const App = () => (
  <div>
    <h1>Movie DB</h1>
    <MovieDetailContainer id={374132}/>
    <MovieDetailContainer id={550}/>
    {/* <MovieDetailContainer id={550}/> */}
  </div>
);

export default App;
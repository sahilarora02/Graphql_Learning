import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query MOVIE($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearcherd] = useState("");
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error:  movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  if (loading) {
    return <h1>Data is Loading</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  if(movieError){
    console.log(movieError)
  }
  return (
    <div>
      {data &&
        data.users.map((data) => {
          return (
            <div>
              <h1>Name:{data.name}</h1>
              <h1>userName:{data.username}</h1>
              <h1>age:{data.age}</h1>
              <h1>Nationality:{data.nationality}</h1>
            </div>
          );
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Movie Name: {movie.name}</h1>;
        })}

      <div>
        <input
          type="text"
          onChange={(event) => {
            setMovieSearcherd(event.target.value);
          }}
          placeholder="Intersteller...."
        />
        <button
          onClick={() => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          Fetch data
        </button>

        <div>
          {movieSearchedData && (
            <div>
              <h1>Movie Name: {movieSearchedData.movie.name} </h1>
              <h1>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}{" "}
              </h1>
            </div>
          )}
          {movieError && <h1>There is some error</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;

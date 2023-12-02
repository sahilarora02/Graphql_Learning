import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearcherd] = useState("");

  //create user States
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationaily] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is Loading</h1>;
  }
  // if (error) {
  //   console.log(error);
  // }
  if (data) {
    console.log(data);
  }

  if (movieError) {
    console.log(movieError);
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name...."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username...."
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="age...."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality...."
          onChange={(event) => {
            setNationaily(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

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

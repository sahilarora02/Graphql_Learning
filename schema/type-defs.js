const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
    favoriateMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

   input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA
   }
   input UpdateUserNameInput {
   id: ID!
   newUsername: String!
   }

   type Mutation {
      createUser(input: CreateUserInput!): User
       updateUsername(input: UpdateUserNameInput):User
   }
   

    enum Nationality {
      CANADA
      BRAZIL
      INDIA
      GERMANY
      CHILE
      UKRAINE
    }
`;

module.exports = { typeDefs };

const { UserList, MovieList } = require("../FakeData");

const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      console.log(UserList);
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    movies: () => {
      return MovieList;
    },

    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
   favoriateMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
 
    createUser: (parent ,args) => {
     const user = args.input
     console.log(user);
     const lastId =UserList[UserList.length - 1].id;
     user.id = lastId+1;
     UserList.push(user);
     return user;
    }
    ,
    updateUsername: (parent ,args) => {
     const { id , newUsername } = args.input
     let userUpdate;
     UserList.forEach((user) => {
      if(user.id === id){
        user.username = newUsername;
        userUpdate = user;
      }
     });
     return userUpdate;
     }

  }

};

module.exports = { resolvers };

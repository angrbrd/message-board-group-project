module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Make authorID the primary key with type INTEGER
    authorID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Author name is required, null is not allowed
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Name must be at least 1 character in length"
        }
      }
    },
    // Author email is required and must be unique
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
            args: [6, 128],
            msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
            msg: "Email address must be valid"
        }
      }
    },
    // Author photo and about entries are not required
    photoLink: DataTypes.STRING,
    about: DataTypes.STRING
  },
  // Associate an author with posts and favorites
  {
    classMethods: {
      associate: function(models) {
        // Associate Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Author.hasMany(models.Post, {
          onDelete: "cascade"
        });
        // Associate Author with Favorites
        // When an Author is deleted, do not delete the Favorites as they may be other users' posts
        Author.hasMany(models.Favorite);
      }
    }
  });

  return Author;
};

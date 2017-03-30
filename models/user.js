module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Make id the primary key with type INTEGER
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // uid is the unique user identifier in Firebase
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // User name is required, null is not allowed
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
    // User email is required and must be unique
    email: {
      type: DataTypes.STRING,
      allowNull: true, // setting to true as Tritter FIP does not return an email
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
    // User photo and about entries are not required
    photoLink: DataTypes.STRING,
    about: DataTypes.STRING
  },
  // Associate an User with posts and favorites
  {
    classMethods: {
      associate: function(models) {
        // Associate User with Posts
        // When a User is deleted, also delete any associated Posts
        User.hasMany(models.Post, {
          onDelete: "cascade"
        });
        // Associate User with Favorites
        // When a User is deleted, do not delete the Favorites as they may be other users' posts
        User.hasMany(models.Favorite);
      }
    }
  });

  return User;
};

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    // Make id the primary key with type INTEGER
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Post title is required, null is not allowed
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Post title must be at least 1 character in length"
        }
      }
    },
    // Post body is required, null is not allowed
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Post body must be at least 1 character in length"
        }
      }
    },
    // Post votes will default to zero for a new post
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // photolink will point to the thumbnail
    photolink: {
      type: DataTypes.STRING,
      defaultValue: "https://pando-assets.s3.amazonaws.com/uploads/2013/07/screen-shot-2013-07-08-at-4-17-49-pm.png",
      allowNull: false, 
      validate:{
        isURL:{
          msg: "The photo link must be a valid URL"
        }
      }
    }
  },
  // Associate a post with a user
  {
    classMethods: {
      associate: function(models) {
        // A User (foreignKey) is required or a Post can't be made
        Post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Post;
};

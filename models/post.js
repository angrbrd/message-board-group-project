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
    }
  },
  // Associate a post with an author
  {
    classMethods: {
      associate: function(models) {
        // An Author (foreignKey) is required or a Post can't be made
        Post.belongsTo(models.Author, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Post;
};

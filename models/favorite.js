module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    // Make id the primary key with type INTEGER
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // postID identifies the starred post
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  // Associate a post with the author who liked it
  {
    classMethods: {
      associate: function(models) {
        // An Author (foreignKey) is required or a favorite can't be recorded
        Favorite.belongsTo(models.Author, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Favorite;
};

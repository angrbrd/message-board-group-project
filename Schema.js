var db = require("./models");

// Clear out the database and subsequently populate it with test data
db.sequelize.sync({force: true}).then(function() {
    // Create a set of test users
    db.User.bulkCreate([
        {
            "name": "Anya",
            "uid": "111",
            "email": "anya@anya.com",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",
            "about": "Hi!!!"
        },
        {
            "name": "Tom",
            "uid": "222",
            "email": "tom@tom.com",
            "photoLink": "https://static.esea.net/global/images/users/679780.1432877411.jpg",
            "about": "HELLO!!!"
        },

        {
            "name": "Jack",
            "uid": "333",
            "email": "jack@jack.com",
            "photoLink": "https://www.thesafaricollection.com/wp-content/uploads/2016/01/Lynns-Giraffe-Tongue-The-Safari-Collection.jpg",
            "about": "Jack says hi!"
        },
        {
            "name": "Kevin",
            "uid": "444",
            "email": "kevin@kevin.com",
            "photoLink": "https://www.thesafaricollection.com/wp-content/uploads/2016/01/Lynns-Giraffe-Tongue-The-Safari-Collection.jpg",
            "about": "KEVIN HERE!"
        }
    ],
    { individualHooks:true })
    .then(function(response) {
       console.log(response);
    })
    .catch(function(error) {
       console.log(error);
    });

    // Create a set of test posts
    db.Post.bulkCreate([
        {
            "title": "Anya's 1st post!",
            "body": "COOL",
            "votes": "10",
            "UserUid": "111",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Tom’s post",
            "body": "COOL",
            "votes": "20",
            "UserUid": "222",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Jack's post",
            "body": "COOL",
            "votes": "30",
            "UserUid": "333",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Kevin’s post",
            "body": "SUPER COOL!!!",
            "votes": "35",
            "UserUid": "444",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Anya's 2st post!",
            "body": "super duper COOL",
            "votes": "10",
            "UserUid": "111",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Tom’s computer post",
            "body": " not COOL",
            "votes": "20",
            "UserUid": "222",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Jack's happy post",
            "body": "happy happy happy",
            "votes": "30",
            "UserUid": "333",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        },
        {
            "title": "Kevin’s 2nd post",
            "body": "SUPER COOL!!!",
            "votes": "35",
            "UserUid": "444",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg"
        }
    ],
    { individualHooks: true })
    .then(function(response) {
       console.log(response);
    })
    .catch(function(error) {
       console.log(error);
    });

    // Create a set of test favorite posts
    db.Favorite.bulkCreate([
        {
            "postID": "3",
            "UserUid": "222"
        },
        {
            "postID": "3",
            "UserUid": "111"
        },
        {
            "postID": "5",
            "UserUid": "111"
        },
        {
            "postID": "6",
            "UserUid": "333"
        },
        {
            "postID": "1",
            "UserUid": "222"
        },
        {
            "postID": "2",
            "UserUid": "444"
        }
    ],
    { individualHooks:true })
    .then(function(response) {
       console.log(response);
    })
    .catch(function(error) {
       console.log(error);
    });
});

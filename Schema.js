var db = require("./models");

db.User.bulkCreate([
	{"name": "Anya",
    "email": "anya@anya.com",
    "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",
    "about": "Hi!!!"
	},
	{
	"name": "Tom",
	"email": "tom@tom.com",
	"photoLink": "https://static.esea.net/global/images/users/679780.1432877411.jpg",
	"about": "HELLO!!!"
	},

	{
	"name": "Jack",
	"email": "jack@jack.com",
	"photoLink": "https://www.thesafaricollection.com/wp-content/uploads/2016/01/Lynns-Giraffe-Tongue-The-Safari-Collection.jpg",
	"about": "Jack says hi!"
},

{
	"name": "Kevin",
	"email": "kevin@kevin.com",
	"photoLink": "https://www.thesafaricollection.com/wp-content/uploads/2016/01/Lynns-Giraffe-Tongue-The-Safari-Collection.jpg",
	"about": "KEVIN HERE!"
	}
],
{individualHooks:true})


.then(function(){
	//console.log(db.Author);
	//res.json(db.Author);
});

db.Post.bulkCreate([
    {
        "title": "Anya's 1st post!",
        "body": "COOL",
        "votes": "10",
        "UserId": "1",
        "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Tom’s post",
        "body": "COOL",
        "votes": "20",
        "UserId": "2",
        "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Jack's post",
        "body": "COOL",
        "votes": "30",
        "UserId": "3",
        "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Kevin’s post",
        "body": "SUPER COOL!!!",
        "votes": "35",
        "UserId": "4",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Anya's 2st post!",
        "body": "super duper COOL",
        "votes": "10",
        "UserId": "1",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",
    },
    {
        "title": "Tom’s computer post",
        "body": " not COOL",
        "votes": "20",
        "UserId": "2",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Jack's happy post",
        "body": "happy happy happy",
        "votes": "30",
        "UserId": "3",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    },
    {
        "title": "Kevin’s 5th post",
        "body": "SUPER COOL!!!",
        "votes": "35",
        "UserId": "4",
            "photoLink": "http://weknowyourdreams.com/images/kittens/kittens-07.jpg",

    }
],
{ individualHooks: true })
.then(function(response) {
   console.log(response);
})
.catch(function(error) {
   console.log(error);
})

db.Favorite.bulkCreate([
	{"postID": "3",
	"UserId": "2"
	},
	{
	"postID": "3",
	"UserId": "1"
	},

	{
	"postID": "5",
	"UserId": "1"
	},

	{
	"postID": "6",
	"UserId": "3"
	},
	{
	"postID": "1",
	"UserId": "2"
	},
	{
	"postID": "2",
	"UserId": "4"
	}
],
{individualHooks:true})


.then(function(){
	//console.log(db.Author);
	//res.json(db.Author);
});



// User.bulkCreate([
//   { username: 'barfooz', isAdmin: true },
//   { username: 'foo', isAdmin: true },
//   { username: 'bar', isAdmin: false }
// ]).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
//   return User.findAll();
// }).then(function(users) {
//   console.log(users) // ... in order to get the array of user objects
// })



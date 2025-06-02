// Query to add 10 books to the books collection
use plpbookstore;

// TASK 2
db.books.insertMany([
    {title : "Kidagaa", author: "Khaled Hosseini", genre: "Fiction", published_year: 2003, price: 15.99, in_stock: true, pages: 500, publisher: "Riverhead Books"},
    {title : "The Alchemist", author: "Paulo Coelho", genre: "Adventure", published_year: 1988, price: 10.99, in_stock: true, pages: 208, publisher: "HarperOne"},
    {title : "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 12.99, in_stock: false, pages: 180, publisher: "Scribner"},
    {title : "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 14.99, in_stock: true, pages: 328, publisher: "Secker & Warburg"},
    {title : "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", published_year: 1960, price: 7.99, in_stock: true, pages: 281, publisher: "J.B. Lippincott & Co."},
    {title : "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", published_year: 1951, price: 8.99, in_stock: false, pages: 277, publisher: "Little, Brown and Company"},
    {title : "Brave New World", author: "Aldous Huxley", genre: "Dystopian", published_year: 1932, price: 9.99, in_stock: true, pages: 311, publisher: "Chatto & Windus"},
    {title : "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 11.99, in_stock: true, pages: 310, publisher: "George Allen & Unwin"},
    {title : "Pride and Prejudice", author: "Jane Austen", genre: "Romance", published_year: 1813, price: 6.99, in_stock: true, pages: 279, publisher: "T. Egerton"},
    {title : "The Catch-22", author: "Joseph Heller", genre: "Satire", published_year: 1961, price: 13.99, in_stock: true, pages: 453, publisher: "Simon & Schuster"} 
]);

//Query to find all books in a specific genre
db.books.find({genre: "Fiction"});

// query to find books published after a certain year
db.books.find({published_year: {$gt: 1990}});

//Query to find books by a specific author
db.books.find({author : "J.D. Salinger"});

//Query to update the price of a specific book
db.books.updateMany({title: 'The Catcher in the Rye'}, {$set : {price : 500}});

// Query to delete a book by its title
db.books.deleteMany({title: "To Kill a Mockingbird"});

// TASK 3
// Query to find books that are both in stock and published after 2010
db.books.find({in_stock: true, published_year: {$gt: 2010}});

// using projection
db.books.aggregate({
    $project: {
        title: 1,
        author: 1,
        price: 1
    }
});

// using sort
db.books.find().sort({price : 1}); //by ascending order
db.books.find().sort({price : -1}); //by descending order

// use of limit and skip to implement pagination (5 books per page)
db.books.find().limit(5).skip(5); // skips the first 5 books and returns the next 5

// TASK 4
// Aggregation to find the average price of books in each genre
db.books.aggregate([ { $group : {_id: "$genre", average_price : {$avg : "$price"}}}]);

// Qury to find aythor with the most books
db.books.aggregate([{ $group : {_id : "$author", howmanybooks: {$sum : 1}}}, {$sort : {homanybooks : -1}}, {$limit : 1}]);

// Query to group books by publication decade and counts them
db.books.aggregate([{ 
    $group : {_id : {decade: {$substr: ["$published_year", 0, 3]}}, howmanybooks: {$sum : 1}}}, 
    {$sort : {homanybooks : -1}}]);

// TASK 5
// Indexing to improve query performance on the title field 
db.books.createIndex({title : 1});

//compound index on author and published_year
db.books.createIndex({author: 1, published_year: 1});

//using the explain() method to analyze the performance of a query
db.books.find({title : "The Catcher in the Rye"}).explain();


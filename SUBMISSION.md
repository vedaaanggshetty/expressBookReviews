# IBM Full Stack Developer Final Project Submission - Express Book Reviews

Task 1: Fork verification
Command:
curl -s https://api.github.com/repos/vedaaanggshetty/expressBookReviews | grep -E '"full_name"|"fork"|"parent"'
Output:
{
  "full_name": "vedaaanggshetty/expressBookReviews",
  "fork": true,
  "parent": {
    "full_name": "ibm-developer-skills-network/expressBookReviews"
  }
}

Task 2: Get all books (getallbooks)
Command:
curl -s http://localhost:5000/
Output:
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  "3": { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
  "4": { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
  "5": { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
  "6": { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
  "7": { "author": "Unknown", "title": "Njál's Saga", "reviews": {} },
  "8": { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
  "9": { "author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {} },
  "10": { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

Task 3: Get books by ISBN (getbooksbyISBN)
Command:
curl -s http://localhost:5000/isbn/1
Output:
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}

Task 4: Get books by author (getbooksbyauthor)
Command:
curl -s http://localhost:5000/author/Chinua%20Achebe
Output:
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]

Task 5: Get books by title (getbooksbytitle)
Command:
curl -s http://localhost:5000/title/Things%20Fall%20Apart
Output:
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]

Task 6: Get book review (getbookreview)
Command:
curl -s http://localhost:5000/review/1
Output:
{
  "testuser": "This is an excellent book highly recommended"
}

Task 7: Register (register)
Command:
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass123"}'
Output:
{
  "message": "User successfully registered. Now you can login"
}

Task 8: Login (login)
Command:
curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass123"}'
Output:
Login successful!

Task 9: Add/modify review (reviewadded)
Command:
curl -s -X PUT "http://localhost:5000/review/1?review=This+is+an+excellent+book+highly+recommended" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHBhc3MxMjMiLCJpYXQiOjE3NzUwMzY2OTMsImV4cCI6MTc3NTA0MDI5M30.HSdDOxNIVxEedIuYmtl-tQOA0sJhdvCjF0yIx39puKQ"
Output:
The review for the book with ISBN 1 has been added/updated.

Task 10: Delete review (deletereview)
Command:
curl -s -X DELETE "http://localhost:5000/review/1" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHBhc3MxMjMiLCJpYXQiOjE3NzUwMzY2OTMsImV4cCI6MTc3NTA0MDI5M30.HSdDOxNIVxEedIuYmtl-tQOA0sJhdvCjF0yIx39puKQ"
Output:
Reviews for the ISBN 1 posted by the user testuser deleted.

Task 11: Async retrieval implementation
The implementation for retrieving books using Promises (Task 11) is located in the routes `/`, `/isbn/:isbn`, `/author/:author`, and `/title/:title` inside `final_project/router/general.js`.

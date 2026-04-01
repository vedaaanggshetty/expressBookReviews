# IBM Full Stack Developer Final Project Submission - Express Book Reviews

## Task 1: Fork verification
**Command:**
```bash
curl -s https://api.github.com/repos/vedaaanggshetty/expressBookReviews | grep -E '"full_name"|"fork"|"parent"'
```
**Output:**
```json
  "full_name": "vedaaanggshetty/expressBookReviews",
  "fork": true,
  "parent": {
    "full_name": "ibm-developer-skills-network/expressBookReviews",
```

## Task 2: Get all books (`getallbooks`)
**Command:**
```bash
curl -s http://localhost:5000/
```
**Output:**
```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
```

## Task 3: Get books by ISBN (`getbooksbyISBN`)
**Command:**
```bash
curl -s http://localhost:5000/isbn/1
```
**Output:**
```json
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

## Task 4: Get books by author (`getbooksbyauthor`)
**Command:**
```bash
curl -s http://localhost:5000/author/Chinua%20Achebe
```
**Output:**
```json
[{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}]
```

## Task 5: Get books by title (`getbooksbytitle`)
**Command:**
```bash
curl -s http://localhost:5000/title/Things%20Fall%20Apart
```
**Output:**
```json
[{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}]
```

## Task 6: Get book review (`getbookreview`)
**Command:**
```bash
curl -s http://localhost:5000/review/1
```
**Output:**
```json
{"testuser":"This is an excellent book highly recommended"}
```

## Task 7: Register (`register`)
**Command:**
```bash
curl -s -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```
**Output:**
```json
{"message":"User successfully registered. Now you can login"}
```

## Task 8: Login (`login`)
**Command:**
```bash
curl -s -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```
**Output:**
```json
{
  "message": "User successfully logged in",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHBhc3MxMjMiLCJpYXQiOjE3NzUwMzI2MjcsImV4cCI6MTc3NTAzNjIyN30.vKlMVQUyzXLI0iegekNQbw62gfounwV7igJyiy9gtKo"
}
```

## Task 9: Add/modify review (`reviewadded`)
**Command:**
```bash
curl -s -X PUT "http://localhost:5000/review/1?review=This+is+an+excellent+book+highly+recommended" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHBhc3MxMjMiLCJpYXQiOjE3NzUwMzI2MjcsImV4cCI6MTc3NTAzNjIyN30.vKlMVQUyzXLI0iegekNQbw62gfounwV7igJyiy9gtKo"
```
**Output:**
```text
The review for the book with ISBN 1 has been added/updated.
```

## Task 10: Delete review (`deletereview`)
**Command:**
```bash
curl -s -X DELETE "http://localhost:5000/review/1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHBhc3MxMjMiLCJpYXQiOjE3NzUwMzI2MjcsImV4cCI6MTc3NTAzNjIyN30.vKlMVQUyzXLI0iegekNQbw62gfounwV7igJyiy9gtKo"
```
**Output:**
```text
Reviews for the ISBN 1 posted by the user testuser deleted.
```

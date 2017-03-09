# Node-Postgres
FSA March 9, 2017
> RDBMSs, Database Drivers, and Persistent Applications
**1. Intro & History**
**2. Using Postgres**
_____
## 1. Intro & History
#### DBMS
Database management systems like SQLite allow us to interact with our DBs. Indexing, performance, administration – it deals intelligently with the file system.
- PosgreSQL
- MySQL
- SQLite
#### Brief History
* Navigational DB (<1970s) – Common during tape era
* Relational (> 1970s) – Based on table-based logic
* NoSQL (> 2000s) – 'Not only SQL', document storage, for example
PostgreSQL
- INGRES
- Postgres
- POSTQUEL
- PostgreSQL <== What most people are talking about
#### Why Postgres?
Powerful, popular. Rapid open source development. Reliable, ACID, focus on data integrity. Take their standards seriously. Contains elements of NoSQL, including arrays and other datatypes in the DB.
Tools include...
- psql (CLI)
- pgcli (CLI)
- Postico (GUI)
- Datazenit (GUI)
____
## 2. Using Postgres
#### DBs on the Stack
      Filesystem ===> Back-end ======> Front-End
      Serial data/HD |  Node.js  |    Chrome
Postgres operates alongside node.js to talk with the filesystem.
`Pg` is a database driver that connects us from node to Postgres.
Our SQL comes from a client. These are our **query sources**.
#### Postgres is a TCP server
How do we transmit SQL text to our app?
      Filesystem <====  Postgres <============== TCP client
                file writes         incoming SQL
                            | TCP  |
                            | PORT |
      ================> Postgres ==============> TCP client
          file reads        response with results
As long as can send a TCP query, we can query our Posgres database! Similar to HTTP but **not**. It uses its own protocol called Postgres. Postgres only sends `SQL`.
#### How can our JS app communicate with the Postgres server?
We use `pg` a.k.a. Node-postgres !
This is our **database driver**. It implements the Postgres protocol in Node, right in JS.
Uses a client object that we can pass SQL queries to. Allows us to send asynchronous queries via node.
      // I pass this SQL string to my pg client. The client queries the DB, converts the result into a JS object and then runs the callback when the query is complete.
      client.query('SELECT * FROM users', function (err, data) {
        // ^ here is my callback
        data.rows(for.Each (function (row) {
            // do stuff in my callback;
          }));
      });
This module parses the SQL and gives us some lovely JS object to work on!
> We could even install Postgres on another server, and communicate with it
#### `returning` keyword
Used during insert and update. After the update or insert, Postgres returns the rows you inserted or updated!
#### MongoDB vs Postgres
MongoDB stores JSON objects, not columns and rows.
#### Coming soon: Sequelize
`Sequelize` will wrap around `pg`, making our lives easier by making SQL queries more clean and clear!
____


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Brink56$',
  database : 'Wetherbee',
});

//const connection = mysql.createPool({
// host     : process.env.RDS_HOSTNAME,
// user     : process.env.RDS_USERNAME,
// password : process.env.RDS_PASSWORD,
//// port     : process.env.RDS_PORT,
// database : process.env.RDS_DB_NAME
//});


console.log(connection)

// Starting our app.
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a POST route that inserts data to the 'users' table.
app.post('/signup', function (req, res) {
    // Connecting to the database.

         
       
         
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (insert user into the 'users' table).
                             
    connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(req.body)
    });
  });
});

// Creating a POST route that inserts data to the 'users' table.
app.post('/login', function (req, res) {
    // Connecting to the database.

         
       
         
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (insert user into the 'users' table).
                             
    connection.query('SELECT * FROM users WHERE phone_number = ? AND password = ?', [req.body.PHONE_NUMBER, req.body.PASSWORD], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a POST route that returns data from the 'terms' table.
app.get('/terms', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'terms' table).

    connection.query('SELECT * FROM terms', function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a get route that returns data from the 'term' table.
app.get('/term', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM term WHERE term_id = ?', req.query.termId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a get route that returns data from the 'term' table.
app.get('/words', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM words where date = CURDATE()',  function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a get route that returns data from the 'term' table.
app.get('/courses', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM courses', function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Creating a get route that returns data from the 'term' table.
app.get('/popular', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM popular', function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/upcomingExams', function (req, res) {
    // Connecting to the database.
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;
    console.log(today)
   connection.getConnection(function (err, connection) {
 
   
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM exams WHERE date >= ? ORDER BY date ASC', today, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


app.get('/questions', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM questions WHERE user_id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/answers', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM answers WHERE user_id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/completedTopicList', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).

    connection.query('SELECT * FROM terms INNER JOIN completed_topic_list ON terms.id = completed_topic_list.terms_id WHERE completed_topic_list.user_id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/prizes', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM prizes WHERE user_id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/offline', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM offline', function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/updatePhoneNumber', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('UPDATE users SET phone_number = ? WHERE id = ?', [req.body.PHONE_NUMBER, req.body.USER_ID], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/updateUsername', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('UPDATE users SET username = ? WHERE id = ?', [req.body.USERNAME, req.body.USER_ID], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/updateGrade', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('UPDATE users SET grade = ? WHERE id = ?', [req.body.GRADE, req.body.USER_ID], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/updatePassword', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('UPDATE users SET password = ? WHERE id = ? AND password = ?', [req.body.NEW_PASSWORD, req.body.USER_ID, req.body.CURRENT_PASSWORD], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/notifications', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('SELECT * FROM notifications WHERE user_id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/readOffline', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table).
    connection.query('UPDATE users SET read_offline = IF(read_offline=1, 0, 1) WHERE id = ?', req.query.userId, function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/updateName', function (req, res) {
    // Connecting to the database.

   connection.getConnection(function (err, connection) {
 
    // Executing the MySQL query (select all data from the 'term' table)
    connection.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', [req.body.FIRST_NAME, req.body.LAST_NAME, req.body.USER_ID], function (error, results, fields) {
      connection.release();

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


//app.get('/leaderboard', function (req, res) {
//    // Connecting to the database.
//
//   connection.getConnection(function (err, connection) {
//   var ENDDATE = { toSqlString: function() { return 'DATE()'; } };
//
//                            req.query.date =
//
//    // Executing the MySQL query (select all data from the 'term' table)
//                            ;.
//    connection.query('SELECT * FROM leaderboards WHERE date BETWEEN ? AND DATE', [req.body.firstName, req.body.lastName, req.body.userId], function (error, results, fields) {
//      connection.release();
//
//      // If some error occurs, we throw an error.
//      if (error) throw error;
//
//      // Getting the 'response' from the database and sending it to our route. This is were the data is.
//      res.send(results)
//    });
//  });
//});
//
//app.get('/analytics', function (req, res) {
//    // Connecting to the database.
//
//    if (req.query.date = 'week'){
//       connection.getConnection(function (err, connection) {
//
//
//
//
//        // Executing the MySQL query (select all data from the 'term' table)
//        connection.query('SELECT * FROM leaderboards WHERE YEARWEEK(date) = YEARWEEK(NOW() - INTERVAL 1 WEEK) AND user_id = ?', req.query.userId, function (error, results, fields) {
//          connection.release();
//
//          // If some error occurs, we throw an error.
//          if (error) throw error;
//
//          // Getting the 'response' from the database and sending it to our route. This is were the data is.
//          res.send(results)
//        });
//      });
//  }else if(req.query.date = 'month'){
//    connection.getConnection(function (err, connection) {
//
//
//
//
//      // Executing the MySQL query (select all data from the 'term' table)
//      connection.query('SELECT * FROM leaderboards WHERE YEARWEEK(date) = YEARWEEK(NOW() - INTERVAL 4 WEEK) AND user_id = ?', req.body.userId, function (error, results, fields) {
//        connection.release();
//
//        // If some error occurs, we throw an error.
//        if (error) throw error;
//
//        // Getting the 'response' from the database and sending it to our route. This is were the data is.
//        res.send(results)
//      });
//    });
//        }else if(req.query.date = 'alltime'){
//        connection.getConnection(function (err, connection) {
//
//
//
//
//             // Executing the MySQL query (select all data from the 'term' table)
//                                     ;.
//             connection.query('SELECT * FROM leaderboards WHERE user_id = ?', req.query.userId, function (error, results, fields) {
//               connection.release();
//
//               // If some error occurs, we throw an error.
//               if (error) throw error;
//
//               // Getting the 'response' from the database and sending it to our route. This is were the data is.
//               res.send(results)
//             });
//           });
//        }
//});


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});

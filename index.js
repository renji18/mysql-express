const express = require('express')
const bodyParser = require('body-parser')
const mysqlConnection = require('./connection')
const app = express()

app.use(bodyParser.json())

app.get(
    '/employees',
    (req,
     res) => {mysqlConnection.query(`SELECT * FROM employee`, (err, rows) => {
      if (err) {
        console.log(err, ' Error')
      } else {
        console.log(rows)
        res.send(rows)
      }
    })})

app.get(
    '/employees/:id',
    (req, res) => {mysqlConnection.query(
        `SELECT * FROM employee WHERE id=?`, [req.params.id], (err, rows) => {
          if (err) {
            console.log(err, ' Error')
          } else {
            console.log(rows)
            res.send(rows)
          }
        })})

app.post('/employees', (req, res) => {
  const empData = [req.body.name, req.body.salary]
  mysqlConnection.query(
    `INSERT INTO employee(name, salary) values(?)`,
    [empData],
    (err, rows) => {
  if (err) {
    console.log(err, ' Error')
  } else {
    console.log(rows)
    res.send(rows)
  }
    }
  )
})

  app.patch(
      '/employees',
      (req, res) => {mysqlConnection.query(
          `UPDATE employee SET ? WHERE ID=` + req.body.id, [req.body],
          (err, rows) => {
            if (err) {
              console.log(err, ' Error')
            } else {
              console.log(rows)
              res.send(rows)
            }
          })})

  app.put(
      '/employees',
      (req, res) => {mysqlConnection.query(
          `UPDATE employee SET ? WHERE ID=` + req.body.id, [req.body],
          (err, rows) => {
            if (err) {
              console.log(err, ' Error')
            } else {
              console.log(rows)
              if (rows.affectedRows == 0) {
                const empData = [req.body.name, req.body.salary]
                mysqlConnection.query(
                    'INSERT INTO employee(name, salary) values(?)', [empData],
                    (err, rows) => {
                      if (err) {
                        console.log(err, ' Error');
                      } else {
                        res.send(rows)
                      }
                    })
              }
              else {
                res.send(rows)
              }
            }
          })})

  app.delete(
      '/employees/:id',
      (req, res) => {mysqlConnection.query(
          `DELETE FROM employee WHERE id=?`, [req.params.id], (err, rows) => {
            if (err) {
              console.log(err, ' Error')
            } else {
              console.log(rows)
              res.send(rows)
            }
          })})

  app.listen(
      process.env.PORT || 3000,
      () => {console.log(
          `Express server is running on port ${process.env.PORT || 3000}`)})

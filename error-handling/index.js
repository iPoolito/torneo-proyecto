module.exports = app => {
  app.use((req, res, next) => {
    res.status(404).render('not-found')
  })

  app.use((err, req, res, next) => {
    if (!res.headersSent) {
      res.status(500).render('error')
    }
  })
}

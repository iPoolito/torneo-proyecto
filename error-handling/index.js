module.exports = app => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).render('not-found')
  })

  app.use((err, req, res, next) => {
    if (!res.headersSent) {
      res.status(500).render('error')
    }
  })
}

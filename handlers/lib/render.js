function index (html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Hamster Ball Fantasy League</title>
        <link rel="stylesheet" href="stylesheet.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,500,500i,900i" rel="stylesheet" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="application.min.js"></script>
      </body>
    </html>
    `
}

module.exports = { index }

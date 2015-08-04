// client id:
// scope 'user:email'
// redirect_url: http://localhost:8080/?callback=demo
// state: random code


$(function() {
  var profileUrl = 'auth/github/profile'
  var url = window.location.href

  var params = url.split('?')[1]

  if (params) {
    params = params.split('&')

    var parmObj = {};

    params.forEach(function(parm) {
      var prop = parm.split('=')[0]
      var value = parm.split('=')[1]

      parmObj[prop] = value;
    })

    if(parmObj.loggedin === 'true') {
      console.log('logged in!')

      $.get(profileUrl)
      .done(function(userInfo) {
        console.log(userInfo)
      })
      .fail(function() {
        console.log('shit broke')
      })

    } else {
      console.log('Silly hacker... no auth for you!')
    }

  }

  $('button').click(function() {
    // var redirect_uri = 'http://localhost:8080/?callback=demo'
    // var scope = 'user:email'

    var url = 'auth/github'

    window.location.assign(url)
  })
})

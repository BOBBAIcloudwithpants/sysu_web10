function setCookie (c_name, value, expiredays, username) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + value +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=\"";
  document.cookie = "username=" + username + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=\"";
}



window.onload = function () {



  $('#give').click(function () {
    var username = $('#Username').val();
    var password = $('#password').val();
    $.ajax({
      type: 'POST',
      url: '/signin',
      dataType: 'text',
      data: {
        username,
        password
      },
      success (result) {
        let res = $.parseJSON(result);
        setCookie("token", res.token, 1, username);
        window.location.href = `/?username=${username}`
      },
      error (xhr, txtstatus, errthrow) {
        $('#warning').text(xhr.responseText)
        $('#warning').css('opacity', '1');
        $('#warning').fadeIn();
      }
    })

  })

  var button = this.document.getElementById('clear')
  button.onclick = function () {
    var contents = document.getElementsByClassName('content')

    for (let i = 0; i < contents.length; i++) {
      contents[i].value = ''
    }
    $('#warning').fadeOut();
  }
}
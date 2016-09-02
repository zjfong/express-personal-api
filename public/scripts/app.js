console.log("Sanity Check: JS is working!");


$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/music",
    //data:
    success: onSuccess,
    //error: onError
  });

  function onSuccess(data){
    console.log(data);
    var musicHtml = template({
      Song: data[0]
    });

    console.log(musicHtml);
    $("#music-list").append(musicHtml);
  };

  var source = $('#music-template').html();
  var template = Handlebars.compile(source);

});

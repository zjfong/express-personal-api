console.log("Sanity Check: JS is working!");


$(document).ready(function(){




  $.ajax({
    method: 'GET',
    url: '/api/music',
    //data:
    success: displaySongs,
    //error: onError
  });

  function displaySongs(data){
    console.log(data);

    data.forEach(function go(element, i, arr){
      var musicHtml = template({
        Song: arr[i]
      });

      //console.log(musicHtml);
      $("#form-list").append(musicHtml);
    });

  };

  var source = $('#music-template').html();
  var template = Handlebars.compile(source);



  $('#form').submit(function(event){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/music',
      data: {title: $('#song-title').val(), artist: $('#song-artist').val()},
      success: createSong,
      error: onError
    });

    function createSong(data){
      console.log(data);
      $('#form-list').append("<hr><li>" + data.title + " by " + data.artist +
        " <button type='button' class='btn btn-danger'>Danger</button></li>");
    };

    function onError(xhr, status, err){
      console.log("title ", $('#song-title').val());
      console.log("artist ", $('#song-artist').val());
      console.log("help ", err);

    };
  });

  $('#form-list').on('click', '.deleteBtn', function(event){
    console.log($(this))
    console.log($(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/music/'+$(this).attr('data-id'),
      data: $('#form input').serialize(),
      success: deleteSong,
      error: onError
    });

    function deleteSong(data){
      console.log(data)
      //var songTitle = json.title;
      //console.log(json.title)

      // for(i=0; i<data.length-1)

      // $('#form-list').empty();
      //$('#form-list').append()
    };
    function onError(xhr, status, err){
      //console.log($('#form input').serialize());
      //console.log(data + 'not working');
      console.log("help ", err);

    };
  });

});

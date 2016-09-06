console.log("Sanity Check: JS is working!");
var template;
var $songList;
var allSongs = [];

$(document).ready(function(){

  $songList = $('#song-list');

  //display profile
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: displayProfile
  });

  function displayProfile(data){
    //console.log('profile data ' + data.name)
    var profileHtml = template2({
      profile: data
    })
    $("#profile").append(profileHtml);
  }

  //display songs
  $.ajax({
    method: 'GET',
    url: '/api/music',
    //data:
    success: displaySongs,
    //error: onError
  });

  function displaySongs(data){
    console.log("display songs " + data);

    data.forEach(function go(element, i, arr){
      var musicHtml = template({
        song: arr[i]
      });
      //render();
      //console.log(musicHtml);
      $("#song-list").append(musicHtml);
    });

  };

  var source = $('#music-template').html();
  var template = Handlebars.compile(source);

  var source2 = $('#profile-template').html();
  var template2 = Handlebars.compile(source2);


  //create song
  $('#form').submit(function(event){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/music',
      data: {title: $('#song-title').val(), artist: $('#song-artist').val()},
      success: createSong,
      error: onError
    });


  });

  //update song
  $('#song-list').on('click', '.btn-warning', function(event){

    //var songId = $(this).closest('.songItem').attr('data-id');
    console.log($(this))
    console.log($(this).attr('data-id'));
    $.ajax({
      method: 'PUT',
      //url: '/api/music/',
      url: '/api/music/'+$(this).attr('data-id'),
      data: $('#form input').serialize(),
      success: updateSong,
      error: onError
    });

    function updateSong(data){
      console.log(data)
      var musicId = data;
      for(var i=0; i<allSongs.length; i++) {
        console.log(i)
        if(allSongs[i]._id === musicId) {
          console.log('updating')
          allSongs.splice(i, 1, data);
          break;
        }
      }
    }
  });

  //delete song
  $('#song-list').on('click', '.deleteBtn', function(event){
    console.log($(this))
    console.log($(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/music/'+$(this).attr('data-id'),
      //url: '/api/music/'+$(this).attr('data-id'),
      data: $('#form input').serialize(),
      success: deleteSong,
      error: onError
    });

    function deleteSong(data){
      console.log(data)
      var music = data;
      var musicId = music._id;
      console.log('delete book', musicId);
      for(var i=0; i<allSongs.length; i++) {
        if(allSongs[i]._id === musicId) {
          allSongs.splice(i, 1);
          break;
        }
      }
      //var songTitle = json.title;
      //console.log(json.title)

      // for(i=0; i<data.length-1)

      // $('#song-list').empty();
      //$('#song-list').append()
    };
  });



});

    function createSong(data){
      console.log(data);
      $('#form input').val('');
      allSongs.push(data);
      console.log(allSongs)
      //render();
      //$('#song-list').append("<hr><li>" + data.title + " by " + data.artist +
      //  " <button type='button' class='btn btn-danger'>Danger</button></li>");
    };

    function onError(xhr, status, err){
      //console.log($(this).attr('data-id'));
      //console.log($('#form input').serialize());
      //console.log("title ", $('#song-title').val());
      //console.log("artist ", $('#song-artist').val());
      console.log("help ", err);

    };


  // function render () {
  //   $songList.empty();
  //   var musicHtml = template({ songs: allSongs });
  //   $songList.append(musicHtml);
  // };

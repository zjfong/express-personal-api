console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
var source = $('#music-template').html();
var template = Handlebars.compile(source);
var developerHtml = template({ developers: data.developers });


});

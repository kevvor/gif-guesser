$(document).ready(function() {
    console.log( "document ready" );

    getGifs($('#gif-1'));
    getGifs($('#gif-2'));
    getGifs($('#gif-3'));

});

function getGifs(divId) {
  console.log('getting gifs from server');
  // Make ajax call to server to get gifs

  $.getJSON('api/gifs')
    .then(function(res) {
      return res;
    })
    .then(function(result) {
      console.log(result.data)
      updateDiv(divId, result.data)
    })
    .catch(function(err) {
      console.log(err);
    })
}

function updateDiv(divId, resultData) {
  divId.css({
    "width": resultData.fixed_height_downsampled_width + "px",
    "height": resultData.fixed_height_downsampled_height + "px",
    "background-image": `url("${resultData.fixed_height_downsampled_url}")`
  })
}

$(document).ready(function() {
  console.log('document ready');
  const answers = {};

  loadPage(answers);


});

function loadPage(object) {
  $.getJSON('api/words')
  .then(function(res) {
    object.words = res;
    object.words[0].correct = true; // First word is the answer
    const tag = res[0].word;
    return tag;
  })
  .catch(function(err) {
    console.log(err);
  })
  .then(function(searchTerm) {
    $.getJSON(`api/gifs/${searchTerm}`)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function(gifs) {
      console.log('gifs')
      console.log(gifs)
    })
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
  });
}


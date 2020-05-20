$(document).ready(function () {
  /* <li class="media">
  <img class="align-self-start mr-3"
    src="http://static.tvmaze.com/uploads/images/medium_portrait/246/616301.jpg" alt="Upload">
  <div class="media-body">
    <h5 class="mt-0 mb-1">Upload <span class="badge badge-pill badge-info">Comedy</span><span
        class="badge badge-pill badge-info">Science-Fiction</span><span
        class="badge badge-pill badge-info">Mystery</span><span
        class="badge badge-pill badge-secondary"></span></h5>
    <ul class="list-group">
      <li class="list-group-item">Premiered: 2020-05-01</li>
      <li class="list-group-item">Rating: 8.4</li>
      <li class="list-group-item">Runtime: 30</li>
    </ul>
  </div>
  </li> */

  const createMediaElement = (showObj) => {
    const $mediaLi = $('<li>').addClass('media');
    $('<img>')
      .attr('src', showObj.show.image.medium)
      .attr('alt', showObj.show.name)
      .appendTo($mediaLi);
    const $bodyDiv = $('<div>').addClass('media-body');
    const $title = $('<h5>')
      .addClass('mt-0 mb-1')
      .text(`${showObj.show.name} `);

    // Loooping through all the genres
    $.each(showObj.show.genres, (index, genre) => {
      $('<span>')
        .addClass('badge badge-pill badge-info')
        .text(genre)
        .appendTo($title);
    });

    $('<span>')
      .addClass('badge badge-pill badge-info')
      .text(showObj.show.network ? showObj.show.network.name : null)
      .appendTo($title);

    $bodyDiv.append($title);

    const $ul = $('<ul>').addClass('list-group');

    $('<li>')
      .addClass('list-group-item')
      .text(`Premiered: ${showObj.show.premiered}`)
      .appendTo($ul);
    $('<li>')
      .addClass('list-group-item')
      .text(`Rating: ${showObj.show.rating.average}`)
      .appendTo($ul);
    $('<li>')
      .addClass('list-group-item')
      .text(`Runtime: ${showObj.show.runtime}`)
      .appendTo($ul);

    $bodyDiv.append($ul);

    $mediaLi.append($bodyDiv);

    return $mediaLi;
  };

  const renderMediaEl = (showArr) => {
    // Turn the result into HTML

    // Loop through the array of objects
    $.each(showArr, (index, showObj) => {
      // Create an HTML element out of each object
      const newElement = createMediaElement(showObj);
      // Attach the new elements to the DOM => append to an existing container on the page
      $('#search-results').append(newElement);
    });
  };

  const getSearchResult = (keyword) => {
    // build the url with that keyword
    const url = `http://api.tvmaze.com/search/shows?q=${keyword}`;

    // initiate a request to the API => jQuery AJAX!

    $.ajax({
      url,
      method: 'GET',
    })
      .done(function (data) {
        // getting the result from the search
        console.log(data);

        renderMediaEl(data);
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        console.log('complete');
      });
  };

  // create an submit event listener on the form

  $('#search-frm').on('submit', function (event) {
    // prevent the default behavior
    event.preventDefault();

    $('#search-results').empty();

    // targetting the search box
    const searchBox = $(this).children('input[type="search"]');

    // Extract the value from the search box
    const content = searchBox.val();

    getSearchResult(content);
  });

  // Event delegation. Creating the event listener on the parent element and delegating the event to the children
  $('#search-results').on('click', '.media img' , function(event) {

    console.log("Clicked on the picture")

  });


});

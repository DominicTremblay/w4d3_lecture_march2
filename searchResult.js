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
  
  
    const createMediaEl = (showObj) => {
      console.log(showObj);
      const $li = $('<li>').addClass('media');
      $('<img>')
        .addClass('align-self-start mr-3')
        .attr('src', showObj.show.image && showObj.show.image.medium)
        .attr('alt', showObj.show.name)
        .appendTo($li);
      const $bodyDiv = $('<div>').addClass('media-body');
      const $title = $('<h5>')
        .addClass('mt-0 mb-1')
        .text(`${showObj.show.name} `);
      $.each(showObj.show.genres, (index, genre) => {
        $('<span>')
          .addClass('badge badge-pill badge-info')
          .text(genre)
          .appendTo($title);
      });
  
      $('<span>')
        .addClass('badge badge-pill badge-secondary')
        .text(showObj.show.network && showObj.show.network.name || '')
        .appendTo($title);
  
      $bodyDiv.append($title);
  
      $list = $('<ul>').addClass('list-group');
      $('<li>')
        .addClass('list-group-item')
        .text(`Premiered: ${showObj.show.premiered}`)
        .appendTo($list);
      $('<li>')
        .addClass('list-group-item')
        .text(`Rating: ${showObj.show.rating.average || 'n/a'}`)
        .appendTo($list);
      $('<li>')
        .addClass('list-group-item')
        .text(`Runtime: ${showObj.show.runtime}`)
        .appendTo($list);
  
      $($bodyDiv).append($list);
  
      $li.append($bodyDiv);
  
      return $li;
    };
  
    console.log('READY');
  
    const renderResult = (showArr) => {
      $.each(showArr, (index, show) => {
        $('#search-results').append(createMediaEl(show));
      });
    };
  
    const showSearch = (keyword) => {
      const url = `http://api.tvmaze.com/search/shows?q=${keyword}`;
  
      $.ajax({
        method: 'GET',
        url,
      })
        .done((data) => {
          console.log(data);
          renderResult(data);
        })
        .fail((err) => console.log(error));
    };
  
    $('#search-frm').on('submit', function (event) {
      event.preventDefault();
      $('#search-results').empty();
  
      const $searchBox = $(this).children('input[type="search"]');
  
      const content = $searchBox.val();
  
      showSearch(content);
    });
  });
  
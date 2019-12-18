const ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

const createArticle = articleObj => {
  // create the HTML for one article object

  //   <div class="post-preview" data-article-id="">
  //   <a href="#">
  //     <h2 class="post-title"></h2>
  //     <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3>
  //   </a>
  //   <p class="post-meta">
  //    content
  //     content Posted by <a href="#">Start Bootstrap</a> on September 24, 2019
  //   </p>
  // <hr />
  // </div>

  const $postDiv = $('<div>')
    .addClass('post-preview')
    .attr('data-article-id', articleObj.id);

  const $link = $('<a>').attr('href', '#');

  $('<h2>')
    .addClass('post-title')
    .text(articleObj.title)
    .appendTo($link);
  $('<h3>')
    .addClass('post-subtitle')
    .text('This would be the subtitle if we had one')
    .appendTo($link);

  const $content = $('<p>')
    .addClass('post-meta')
    .text(articleObj.body);

  $('<p>')
    .html(
      'content Posted by <a href="#">Start Bootstrap</a> on September 24, 2019',
    )
    .appendTo($content);

  $postDiv.append($link);
  $postDiv.append($content);
  $('<hr>').appendTo($postDiv);

  return $postDiv;
};

const renderArticles = articlesArr => {
  // jQuery for loop
  $.each(articlesArr, function(index, articleObj) {
    $('#articles').append(createArticle(articleObj));
  });
};

const requestPosts = (method, url) => {
  // issue the request with jQuery Ajax

  $.ajax({
    method,
    url,
  })
    .done(function(result) {
      // Success. Getting the result from the request

      renderArticles(result);
    })
    .fail(function(error) {
      // Problem with the request
      console.log(`Error with the request: ${error.message}`);
    })
    .always(function() {
      // This will always run
      console.log('request completed');
    });
};

$(document).ready(function() {
  requestPosts('GET', ROOT_URL);

  // event listener for click on the link with an id of load-more
  $('#load-more').on('click', function(event) {
    // defaut the default behavior of the link
    event.preventDefault();

    requestPosts('GET', ROOT_URL);
  });
});

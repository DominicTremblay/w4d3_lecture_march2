const ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

const createArticle = articleObj => {
  //   <div class="post-preview" data-article-id="">
  //   <a href="#">
  //     <h2 class="post-title"></h2>
  //     <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3>
  //   </a>
  //   <p class="post-meta">
  //     content
  //     Posted by <a href="#">Start Bootstrap</a> on September 24, 2014
  //   </p>
  // </div>
  // <hr />

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
    .text('This would be the sub-title if we had one')
    .appendTo($link);

  const $content = $('<p>')
    .addClass('post-meta')
    .text(articleObj.body);

  $('<p>')
    .html('Posted by <a href="#">Start Bootstrap</a> on September 24, 2014')
    .appendTo($content);

  $postDiv.append($link, $content);

  $('<hr>').appendTo($postDiv);

  return $postDiv;
};

const renderArticles = articlesArr => {
  $.each(articlesArr, (index, article) => {
    $('#articles').append(createArticle(article));
  });
};

const requestPosts = (method, url, cb) => {
  $.ajax({
    method,
    url,
  })
    .done(result => {
      cb(result);
    })
    .fail(error => console.log(`Error with the request: ${error}`))
    .always(() => console.log(`Request completed.`));
};

// document ready
$(() => {
  // issue a request, callback to renderArticles
  requestPosts('GET', ROOT_URL, renderArticles);
  // define the onClick event handler on the #load-more button

  $('#load-more').on('click', event => {
    event.preventDefault();
    requestPosts('GET', ROOT_URL, renderArticles);
  });
}); // end of document ready

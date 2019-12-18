const ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

const requestPosts = (method, url) => {
  // use the constructor

  const xhr = new XMLHttpRequest();

  // Initializing the request, async is true
  xhr.open(method, url, true);

  // Send the request
  xhr.send();

  // handle the response

  xhr.addEventListener('load', function(evt) {
    console.log('status:', this.status);

    if (this.status >= 200 && this.status < 300) {
      // success
      console.log(this.response);
    } else {
      // problem
      console.log(this.status, 'Error with the request');
    }
  });

  xhr.onreadystatechange = function() {
    console.log(this.readyState);
  };
};

requestPosts('GET', ROOT_URL);

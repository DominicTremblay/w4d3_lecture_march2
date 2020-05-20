const ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

const requestPosts = (method, url) => {
  // use the constructor
  const xhr = new XMLHttpRequest();

  // Initializing the request, async is true
  xhr.open(method, url, true);

  // Send the request
  xhr.send();

  // handle the response
  xhr.addEventListener('load', function (event) {

    if (this.status >= 200 && this.status < 300) {
      console.log(this.response);
    } else {
      console.log('Error with the request:', this.status);
    }

  });

  xhr.onreadystatechange = function(event) {
    console.log('State:', this.readyState)
  }
};

requestPosts('GET', ROOT_URL);

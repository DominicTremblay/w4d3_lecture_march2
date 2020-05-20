const ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

const requestPosts = (method, url) => {
  // use the constructor
  const xhr = new XMLHttpRequest();


  // Initializing the request, async is true
  xhr.open(method, url, true);

  // Send the request
  xhr.send();

  // handle the response


    xhr.addEventListener('load', function(event) {

      if(this.status >= 200 && this.status < 300) {
        // success
        console.log(this.response);
        // build some HTML elements out of the response.
      } else {
        // error
        console.log('Error', this.status);

      }


    });
};

requestPosts('GET', ROOT_URL);

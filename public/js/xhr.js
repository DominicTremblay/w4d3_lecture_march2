const request = (method, url) => {
  const xhr = new XMLHttpRequest();

  // initializes the request
  xhr.open(method, url, true);

  // sends the request
  xhr.send();

  xhr.onreadystatechange = function() {
    console.log('Ready State:', this.readyState);
  };

  xhr.addEventListener('load', function(evt) {
    console.log('status:', this.status);
    console.log('statusText:', this.statusText);

    if (this.status >= 200 && this.status < 300) {
      console.log(this.response);
    } else {
      console.log(`Error: ${this.status}`);
    }
  });

  xhr.addEventListener('error', evt => {
    console.log(`Error, could not complete the request`);
  });
};

const url = 'http://jsonplaceholder.typicode.com/posts';
request('GET', url);

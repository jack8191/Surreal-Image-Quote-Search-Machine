//For accessing the Unsplash API
function searchUnsplashImages(searchTerm, callback) {
  let url = 'https://api.unsplash.com/photos/random/';
  let params = {
      client_id: '9d5c5f49501e8179e3c0fcd3a9e88e155c30a4084ee5141799c20d0db8991db5',
      query: `${searchTerm}`
  }
  $.ajax({
    url,
    method: 'GET',
    data: params,
    success: callback,
    error: errorHandle
    })
  }

  //Rendering those results in the DOM
  function displayUnsplashImages(responseData) {
      let displayImage = `
      <div class="js-search-results">
        <h2>Results</h2>
        <a href=${responseData.user.links.html} title="link to photographer's Unsplash Profile" target="_blank">Photo by ${responseData.user.username}</a>
        <a href=${responseData.links.html} title="link to the photo on Unsplash" target="_blank">View the image on Unsplash</a>
        <a href=${responseData.links.download} title="link to download the image from Unsplash" target="_blank">Download Image?</a>
        <img src=${responseData.urls.regular} alt='a random unsplash image'>
      `;
      $('.js-search-results').html(displayImage);      
  }

  //For accessing the random quote API
  // function getRandomQuote(callback){
  //   let url = 'https://talaikis.com/api/quotes/random/';
  //   $.ajax({
  //     url,
  //     method: 'GET',
  //     success: callback,
  //     error: errorHandle
  //   })
  // }

  //For rendering the random quote in the DOM
  // function displayRandomQuote(quoteResponseData){
  //   let displayQuote = `
  //   <div class="js-quote-result">
  //     <p>"${quoteResponseData.quote}"</p>
  //     <p>—${quoteResponseData.author}</p>
  //   `;
  //   $('.js-quote-result').html(displayQuote);
  // }

  var api = "https://en.wikiquote.org/w/api.php";

function getRandomStart(callback) {
  $.ajax({
    url: "https://en.wikiquote.org/w/api.php",
    data: {
      "action": "query",
      "format": "json",
      "titles": "List of people by name",
      "generator": "links",
      "gplnamespace": "0",
      "gpllimit": "20"
    },
    dataType: "jsonp",
    success: function(jsondata) {
      var links = jsondata.query.pages;
      var pageIds = [];
      for (var prop in links) {
        pageIds.push(links[prop].pageid);
      }
      var rand = pageIds[Math.floor(Math.random() * pageIds.length)];
      callback(rand);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function getRandomName(pageId, callback) {
  $.ajax({
    url: "https://en.wikiquote.org/w/api.php" + "?action=query&format=json&origin=*&prop=links&pageids=" + pageId + "&redirects=1&pllimit=max&callback=?",
    dataType: "jsonp",
    success: function(jsondata) {
      var properId = Object.keys(jsondata.query.pages)[0];
      var links = jsondata.query.pages[properId].links;
      var randPerson = links[Math.floor(Math.random() * links.length)].title;
      while (randPerson.indexOf("List of people") != -1) {
        randPerson = links[Math.floor(Math.random() * links.length)].title;
      }
      currentAuthor = randPerson;
      callback(randPerson);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function getRandomQuote(title, callback) {
  $.ajax({
    url: "https://en.wikiquote.org/w/api.php",
    data: {
      "action": "parse",
      "format": "json",
      "origin": "*",
      "page": title,
      "prop": "text",
      "section": "1",
      "disablelimitreport": 1,
      "disabletoc": 1
    },
    dataType: "jsonp",
    success: function(jsondata) {
      var text = jsondata.parse.text["*"];
      var parser = new DOMParser();
      var doc = parser.parseFromString(text, "text/html");
      while (doc.querySelector("li > ul > li")) {
        var toRemove = doc.querySelector("li > ul");
        toRemove.parentNode.removeChild(toRemove);
      }
      var quotes = doc.querySelectorAll("ul > li");
      var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      currentQuote = randomQuote.textContent || randomQuote.innerText;
      callback(randomQuote.textContent || randomQuote.innerText);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function renderQuote() {
  getRandomStart(function(c) {
    getRandomName(c, function(p) {
      getRandomQuote(p, function(x) {
        $("#quotes").text(x);
      });
      $("#author").text("-" + p);
    });
  });
}

  //Called when one of the API's fails to return useable data
  function errorHandle(){
    let errorMessage = '<p>One of the external API\'s failed to respond. Please try again later.</p>'
    $('.js-error').html(errorMessage)
  }
  
  //Contains event listeners for all buttons including search submit and showing and hiding explanation text
  function onLoad() {
   $('.js-search-form').submit(event => {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('.js-query');
      const query = queryTarget.val();
      searchUnsplashImages(query, displayUnsplashImages);
      renderQuote()
      // getRandomQuote(displayRandomQuote);
    });
    $('#js-show-hide-landing').click(event => {
      $('#landing').toggleClass( "hidden" )
    });
    $('#js-show-hide-why-how').click(event => {
      $('.js-why-and-how').toggleClass( "hidden" )
    });
}
  
  
  
$(onLoad);

//we need a function each to access data from Getty Images and Genius api's
//we need a function to create the html from the results
//we need a function to render the html to the DOM
//we need a function to handle the form submission

//function accessUnsplashApi(){

//}

//function accessGeniusApi(){

//}

//function createResult(){

//}

//function renderResult(){

//}

//function watchSubmit(){

//}

// user submits a search
// use the search to request Getty Images and display
  // show even if the other fails
// use the search to request Genius api's and display
  // show even if the other fails

// do both searches in concurrently
function searchUnsplashImages(searchTerm, callback) {
    let url = 'https://api.unsplash.com/random/';
    let params = {
        client_id: '9d5c5f49501e8179e3c0fcd3a9e88e155c30a4084ee5141799c20d0db8991db5',
        query: `${searchTerm}`
    };
    $.getJSON(url, params, callback);
    }
    
    function displayUnspashImages(responseData) {
        let displayImage = `
        <div class="js-search-results>
            <img src=${responseData.urls.full} alt='a random unsplash image'>
        `;
        $('.js-search-results').html(displayImage);
        
    }

    function getRandomQuote(callback){
      let url = 'https://talaikis.com/api/quotes/random/';
      $.getJSON(url, callback)
    }

    function displayRandomQuote(quoteResponseData){
      let displayQuote = `
      <div class="js-quote-result">
        <p>${quoteResponseData.quote}</p>
      `;
      $('js-quote-result').html(displayQuote)
    }
    
    function handleSearchSubmit(ev) {
      // searchBothApis
      ev.preventDefault()
      const searchTerm = $('.js-search-input').val()
    // 0
      searchUnsplashImages(searchTerm, displayUnspashImages)
    // 3
      randomQuote(displayRandomQuote)
    }
    
    
    $(function onLoad() {
     // renderInitialPageContent()
     $('.container').on('submit', '.js-search-form', handleSearchSubmit)
    })
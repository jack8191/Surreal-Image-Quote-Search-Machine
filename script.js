
function searchUnsplashImages(searchTerm, callback) {
  let url = 'https://api.unsplash.com/photos/random/';
  let params = {
      client_id: '9d5c5f49501e8179e3c0fcd3a9e88e155c30a4084ee5141799c20d0db8991db5',
      query: `${searchTerm}`
  };
  $.getJSON(url, params, callback);
  }
  
  function displayUnsplashImages(responseData) {
      let displayImage = `
      <div class="js-search-results>
          <img src=${responseData.urls.regular} alt='a random unsplash image'>
      `;
      $('.js-search-results').html(displayImage);
      console.log(responseData);
      
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
    console.log(quoteResponseData);
    $('.js-quote-result').html(displayQuote);
  }
  
  function handleSearchSubmit() {
   $('.js-search-form').submit(event => {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('.js-query');
      const query = queryTarget.val();
      searchUnsplashImages(query, displayUnsplashImages);
      getRandomQuote(displayRandomQuote);
    });

}
  
  
  
$(handleSearchSubmit);
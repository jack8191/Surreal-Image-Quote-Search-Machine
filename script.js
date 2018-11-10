
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

  
  function displayUnsplashImages(responseData) {
      let displayImage = `
      <div class="js-search-results">
          <img src=${responseData.urls.regular} alt='a random unsplash image'>
          <a href=${responseData.user.links.html} title="link to photographer's Unsplash Profile" target="_blank">Photo by ${responseData.user.username}</a>
          <a href=${responseData.links.html} title="link to the photo on Unsplash" target="_blank">View the image on Unsplash</a>
          <a href=${responseData.links.download} title="link to download the image from Unsplash" target="_blank">Download Image?</a>
      `;
      $('.js-search-results').html(displayImage);
      console.log(responseData);
      
  }

  function getRandomQuote(callback){
    let url = 'https://talaikis.com/api/quotes/random/';
    $.ajax({
      url,
      method: 'GET',
      success: callback,
      error: errorHandle
    })
  }

  function displayRandomQuote(quoteResponseData){
    let displayQuote = `
    <div class="js-quote-result">
      <p>${quoteResponseData.quote}</p>
      <p>—${quoteResponseData.author}</p>
    `;
    console.log(quoteResponseData);
    $('.js-quote-result').html(displayQuote);
  }

  function errorHandle(){
    let errorMessage = '<p>One of the external API\'s failed to respond. Please try again later.</p>'
    $('.js-error').html(errorMessage)
  }

 // function handleHideShowLanding(){
 //   $('#js-show-hide-landing').click(event => {
 //     $('#landing').toggleClass( "hidden" )
 //   });
 // }

  //function handleHideShowWhyHow(){
  //  $('#js-show-hide-why-how').click(event => {
  //    $('.js-why-and-how').toggleClass( "hidden" )
  //  });
 //}
  
  function onLoad() {
   $('.js-search-form').submit(event => {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('.js-query');
      const query = queryTarget.val();
      searchUnsplashImages(query, displayUnsplashImages);
      getRandomQuote(displayRandomQuote);
    });
    $('#js-show-hide-landing').click(event => {
      $('#landing').toggleClass( "hidden" )
    });
    $('#js-show-hide-why-how').click(event => {
      $('.js-why-and-how').toggleClass( "hidden" )
    });
}
  
  
  
$(onLoad);
//$(handleHideShowLanding);
//$(handleHideShowWhyHow);
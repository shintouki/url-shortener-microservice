URL Shortener Microservice

https://url-shortener-ted.herokuapp.com

Pass in a URL as a parameter to receive shortened URL in JSON response.

Visiting shortened URL will redirect to original link.

Example usage:

https://url-shortener-ted.herokuapp.com/new/http://google.com

https://url-shortener-ted.herokuapp.com/new/http://www.wikipedia.com

Example output:

{"original_url":"http://google.com","short_url":"http://url-shortener-ted.herokuapp.com/3447"}
Then enter shortened URL to get redirected to the original website:

http://url-shortener-ted.herokuapp.com/3447

This should redirect to:

http://www.google.com}

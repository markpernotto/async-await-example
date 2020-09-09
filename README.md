# async-await-example
Short async / await example with some explanation as to what is going on and where. For educational purposes only. 

This is a simple `async` / `await` code example used in a practical context.

Here's the context:
1) Google Maps offers the ability to search for a place using an input text and some Google Maps libraries, most notably the `Places` Map API
2) The results returned from Google will have a number of 'matches' of `Places` that could match our search
3) Sometimes the results returned do not have what is called a `place_id`
4) For the purposes of the rest of the application, we need each place returned by this functionality to contain a `place_id`
5) If that particular `Place` that has been found does not automatically come with a `places_id` property, we need to identify what that `places_id` property is
6) Sometimes it's returned; sometimes we have to go and retrieve it separately in a different Google API endpoint call
7) Do do this, we're making an asynchronous call to a different Google API to get this `places_id`
8) Once we have `place_id`, we can move on with the rest of our application

To recap:
Enter search term in input
Google uses that search term to "Search" it's AutoCompleteService
If the result selected does not contain a `place_id`, it goes and gets one from a separate Google endpoint
Once `place_id` has been identified for the chosen / selected Google location, the app continues 

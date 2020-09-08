  // define an asynchronous function
  searchGoogle = async text => {
    let locationOptions = [];
    // within the function, we create a new Promise
    const promise = new Promise((resolve, reject) => {
      let displaySuggestions = function(predictions, status) {
        if (status === "OK") {
          for (let i = 0; i < predictions.length; i++) {

            locationOptions.push({
              label: predictions[i].description,
              value: predictions[i],
            })
          }
          // our promise data is now complete - so we call resolve() 
          resolve(locationOptions);
        }
      };

      // employ Google's searchbox AutocompleteService()
      let service = new window.google.maps.places.AutocompleteService();

      if(text.length < 1) text = " ";
      // getPlacePredictions requires it's first parameter to be an object
      let suggestion = {
        input: text,
      }
      // get the Place Predictions based off of the returned displaySuggestions function within our Promise
      service.getPlacePredictions(suggestion, displaySuggestions);
    });
    // we literally want to wait for that promise to complete, prior to returning the value 
    return await promise;
  }

  // function to return Google Map details based off of a predefined place_id (supplied by Google)
  searchGooglePlaceID = placeId => {
    let request = {
      placeId,
      fields: ['place_id', 'name', 'geometry']
    };
    let self = this;
    let returnDetails = function (id, status) {
      if (status === "OK") {
        // if the status is okay, and chosen, then let's do something with our new found place_id 
        // in this case, setMapOnLocationSearch zooms to the location found
        self.setMapOnLocationSearch(id)
      }
    };
    // we only want services from a valid PlacesService
    // self.props.map refers to our Google Map instance
    let service = new window.google.maps.places.PlacesService(self.props.map);
    service.getDetails(request, returnDetails);
  }



  // function called when a location is entered into an input
  locationSubmit = (location) => {
    // does the location of a place_id property?
    if(typeof location.place_id === 'string'){
      // if so, search Google's PlacesService
      this.searchGooglePlaceID(location.place_id);
    } else {
      // the location entered doesn't have a place_id, so we don't know where this is
      // we need to call our searchGoogle function, to retrieve a place_id for the location we've entered
      this.searchGoogle(location).then(r => {
        // now that we have a place_id, we can now search Google's PlacesService
        this.searchGooglePlaceID(r[0].value.place_id);
      })
    }
  }
  
  
  // JSX
          <Search
          placeholder="Begin Typing to Search By Location"
          onSubmit={this.locationSubmit}
          label="Location"
        />

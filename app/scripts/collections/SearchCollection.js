import Backbone from 'backbone';
import $ from 'jquery';

import BandModel from '../models/BandModel';

const SearchCollection = Backbone.Collection.extend({
  model: BandModel,
  url: `https://api.spotify.com/v1/search`,
  getResults: function(searchQuery) {
    $.ajax({
      type: 'GET',
      url: `https://api.spotify.com/v1/search`,
      data: {q: searchQuery, type: 'artist'},
      success: (data) => {
        this.reset();
        let bandData = data.artists.items.forEach((data, i, arr) => {
          if (data.images[0]) {
            this.add({
              spotifyId: data.id,
              type: data.artist,
              name: data.name,
              imageUrl: data.images[0].url,
              spotify_url: data.external_urls.spotify,
              followers: data.followers.total,
              popularity: data.popularity
            });
          }
        });
      }
    });
  },
  stopShowingModal: function (id) {
    console.log('id on the searchCollection page ', id);

        this.get(id).set('viewing', false);

  }
});

export default SearchCollection;

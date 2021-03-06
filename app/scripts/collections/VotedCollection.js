import Backbone from 'backbone';
import _ from 'underscore';

import VoteModel from '../models/VoteModel';

const VotedCollection = Backbone.Collection.extend({
  model: VoteModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  getKinveyId: function(spotifyId) {
    let kinveyId;
    // kinveyId = this.findWhere({spotifyId: spotifyId}).get('_id')
    this.models.forEach((bandModel, i, arr) => {
      if (bandModel.get('spotifyId') === spotifyId) {
        kinveyId = bandModel.get('_id');
      }
    });
    return kinveyId;
  },
  unVoteFunction: function(votingBand, username){
    let newVoteRank = votingBand.get('voteRank') - 1;
    let newAllVoters = _.without(votingBand.get('allVoters'), username);

    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);

    // this.get('viewing').set(votingBand, false);
    votingBand.save(null, {
      success: (model, response) => {
        model.set('vewing', false)
        console.log('YOU UPDATED THE ALREADY-VOTED-FOR-BAND');
        if (model.get('voteRank') === 0) {
          model.destroy();
          console.log('DESTORYED' + model.attributes.name + 'BECAUSE BAND WAS AT ZERO VOTES');
        }
        this.trigger('update');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });

  },
  addVoteFunction: function(votingBand, username){
    let newVoteRank = votingBand.get('voteRank') + 1;
    let newAllVoters = votingBand.get('allVoters').concat(username);
    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);
    votingBand.save(null, {
      success: (model, response) => {
        model.set('vewing', false);
        console.log('YOU VOTED');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });
  },
  createVoteModel: function(band, username){
    let newAllVoters = [username];
    let newVoteRank = 1;
    this.create({
      spotifyId: band.spotifyId,
      name: band.name,
      spotify_url: band.spotify_url,
      imageUrl: band.imageUrl,
      popularity: band.popularity,
      voteRank: newVoteRank,
      allVoters: newAllVoters,
      // viewing: false,
    },{
      success: (model, response) => {
      // model.set('vewing', false)
      console.log('SUCCESS! YOU VOTED FOR: ', band.name);
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
   });
 },
  voteToggle: function(bandObj, username) {
    let votedBand = this.models.filter((bandModel, i, arr) => {
      if (bandModel.get('spotifyId') === bandObj.spotifyId) {
        return bandModel;
      }
    });
//FIRST IF-ELSE: IF there is a band in the VotedCollection...
    if (votedBand[0]) {
      if (votedBand[0].get('allVoters').indexOf(username) !== -1) {
        console.log('YOU VOTED ON THIS ALREADY');
        this.unVoteFunction(votedBand[0], username);
      } else {
        //ELSE IF the user HASN'T VOTED on the band...save vote and update vote model
        this.addVoteFunction(votedBand[0], username);
      }
    } else {
      this.createVoteModel(bandObj, username)
    }
  },
  stopShowingModal: function (id) {
    console.log('id on the votedCollection page ', id);
    this.get(id).set('viewing', false);
    // if (this.get(id).get('viewing')) {
    //   this.get(id).set('viewing', true);
    // }
  }
});

export default VotedCollection;

import React from 'react';
import _ from 'underscore';

import store from '../store';


const BandModal = React.createClass({
  getInitialState: function() {
    return {
      shakeButton: false,
    }
  },
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
      if (this.props.band._id) {
        store.votedCollection.toggleBandModal(this.props.band._id);
      } else {
        store.searchCollection.toggleBandModal(this.props.band.spotifyId);
      }
      e.stopPropagation();
    }
  },
  voteFunction: function () {
    if (!localStorage.authtoken) {
      this.setState({shakeButton: true});
      window.setTimeout(()=>{
        this.setState({shakeModal: false});
      }, 1000);
      console.log('YOU NEED TO LOG IN TO VOTE!');
    } else {
      console.log('this.props.band on BandModal ', this.props.band);
      store.votedCollection.voteToggle(this.props.band.spotifyId);
    }
  },
  render: function() {
    let rank;
    let voteButton = voteButton = <button id={animations} className="vote-btn" onClick={this.voteFunction}>Vote</button>;;
    let animations = '';
    if (this.state.shakeButton) {
      animations = 'shake';
    }

    const kinveyId = store.votedCollection.getKinveyId(this.props.band.spotifyId);
    if(kinveyId) {
      rank = store.votedCollection.get(kinveyId).get('voteRank');
      if (store.votedCollection.get(kinveyId).get('allVoters').indexOf(store.session.get('username')) !== -1) {
        voteButton = <button id={animations} className="vote-btn alreadyVoted" onClick={this.voteFunction}>Un-Vote</button>;
      }
    } else {
      //figure out why this isn't finding anything in my voted collection...
      // rank = store.votedCollection.get(this.props.band.id).get('voteRank');
      rank = 0;
      console.log(store.votedCollection);
    }
    // let votes;
    // console.log(this.props.band);
    // if (this.props.band.voteRank) {
    //   console.log(this.props.band.voteRank);
    // }



    let imageUrl = this.props.band.imageUrl;
    let styles = {backgroundImage: 'url(' + imageUrl + ')'};
    return (
      <div className="modal-container" onClick={this.hideModal}>
        <div className="bandModal-content">
          <h2 className="bandHeadings">{this.props.band.name}</h2>
          <data className="pop-data">Popularity <span className="highlight">{this.props.band.popularity}</span></data>
          <div className="modal-coverImg" style={styles}>
            <p className="spotify-link"><span className="highlight">{this.props.band.name} </span>on Spotify <a href={this.props.band.spotify_url}><i className="fa fa-spotify" aria-hidden="true"></i></a></p>
          </div>
          <div className="band-info">
            <section className="voting-section">
              {voteButton}
            </section>
            <section className="voteTotal-section">{rank} votes</section>
            </div>
        </div>
      </div>
    )
  }
});

export default BandModal;
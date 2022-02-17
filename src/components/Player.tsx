import React from 'react';
import './Player.css';


interface PlayerProps {
    // musicInfo: any[];
}

class Player extends React.Component<PlayerProps, {songsData: any[]|null, songURL: HTMLAudioElement}> {

    constructor(props: PlayerProps) {
        super(props);
        this.state = {
            songsData: [
                {
                    "name": "Twist", 
                    "artist": "Phish", 
                    "url": "http://phish.in/audio/000/020/578/20578.mp3", 
                    "cover_art_url": "static/img/livephish_logos/2000-06-14.jpg", 
                    "date": "2000-06-14"
                }, 
                {
                    "name": "Jam", 
                    "artist": "Phish", 
                    "url": "http://phish.in/audio/000/020/579/20579.mp3", 
                    "cover_art_url": 
                    "static/img/livephish_logos/2000-06-14.jpg", 
                    "date": "2000-06-14"
                }
            ],
            songURL: new Audio("http://phish.in/audio/000/020/579/20579.mp3")
        };
    }

    playSong(audioTune: HTMLAudioElement) {
        console.log('made it')
        audioTune.play();
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_HOST_URL}/get_song_info`)
        .then(response => response.json())
        .then((object) => {
            console.log(object)
            this.setState({
                songsData: JSON.parse(object)
            });
        })

        const audioTune: HTMLAudioElement = new Audio("http://phish.in/audio/000/020/579/20579.mp3")
        this.setState({
            songURL: audioTune
        })
    }

    render() {
      return <div>
          { 
          this.state.songsData?.map(song => 
              <p key={song.url}>{song.name}</p>
          )
      }
      <button onClick={() => this.playSong(this.state.songURL)}>button</button>
      </div>;
    }
  }

export default Player;
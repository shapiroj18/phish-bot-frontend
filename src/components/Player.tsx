import React from 'react';
import './Player.css';
var base64 = require('base-64');


interface PlayerProps {
    // musicInfo: any[];
}

interface PlayerState {
    songsData: any[] | null;
}

class Player extends React.Component<PlayerProps,PlayerState> {

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
                    "cover_art_url": "static/img/livephish_logos/2000-06-14.jpg",
                    "date": "2000-06-14"
                }
            ]
        };
    }

    playSong(audioTune: HTMLAudioElement) {
        audioTune.play();
    }

    getSongCoverArt(date: String) {
        const urlCoverArt = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
        const authentication = `${process.env.REACT_APP_BACKBLAZE_keyID}:${process.env.REACT_APP_BACKBLAZE_applicationKey}`
        let headers = new Headers({
            'Authorization': 'Basic ' + base64.encode(authentication),
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*',
            'Origin': '*'
        })
        // console.log(headers)
        // headers.set('Authorization', 'Basic ' + base64.encode(authentication))
        // console.log(headers.get('Authorization'))


        fetch(urlCoverArt, {method:'GET',
            headers: headers,
            mode: 'cors',
            // credentials: 'include'
            })
            .then(response => console.log(response))
            .then(object => console.log(object));
        
            return 42;
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_HOST_URL}/get_song_info`)
            .then(response => response.json())
            .then((object) => {
                // console.log(object)
                this.setState({
                    songsData: JSON.parse(object)
                });
            })
    }

    render() {
        return <div className="playerDefault">
            {
                this.state.songsData?.map(song =>
                    <p key={song.url}>
                        {song.name} {song.date} {"\n"}
                        <br/>
                        <button onClick={() => this.playSong(new Audio(song.url))}>Play</button>
                    </p>
                )
            }
            <div>
                { this.getSongCoverArt('2009-09-09') }
            </div>
        </div>;
    }
}

export default Player;
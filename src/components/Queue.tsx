import React from 'react';
import { NullLiteral } from 'typescript';
import './Player.css';
import defaultAlbumArt from '../img/default.jpg';
var base64 = require('base-64');


interface QueueProps {
    // musicInfo: any[];
}

interface QueueState {
    songsData: any[] | null;
    albumCover: string;
}

class Queue extends React.Component<QueueProps,QueueState> {

    constructor(props: QueueProps) {
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
            ],
            albumCover: defaultAlbumArt
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_HOST_URL}/get_song_info`)
            .then(response => response.json())
            .then((object) => {
                this.setState({
                    songsData: JSON.parse(object)
                });
            })

        const songDate = '1997-02-17'
        fetch(`${process.env.REACT_APP_HOST_URL}/get_album_art?song_date=${songDate}`)
            .then(response => response.blob())
            .then((imageBlob) => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                this.setState({
                    albumCover: imageObjectURL
                });
            })

    }

    playSong(audioTune: HTMLAudioElement) {
        audioTune.play();
    }

    render() {
        return <div className="playerDefault">
            {
                this.state.songsData?.map(song =>
                    <p key={song.url}>
                        { <img src={this.state.albumCover} alt="album art" /> }
                        {song.name} {song.date} {"\n"}
                        <br/>
                        <button onClick={() => this.playSong(new Audio(song.url))}>Play</button>
                    </p>
                )
            }
        </div>;
    }
}

export default Queue;
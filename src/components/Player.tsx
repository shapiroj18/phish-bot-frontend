import React from 'react';
import './Player.css';


interface PlayerProps {
    // musicInfo: any[];
}

class Player extends React.Component<PlayerProps, { songsData: any[] | null}> {

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
            ]
        };
    }

    playSong(audioTune: HTMLAudioElement) {
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
        </div>;
    }
}

export default Player;
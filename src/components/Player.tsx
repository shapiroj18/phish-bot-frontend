import React from 'react';
import Queue from './Queue'
import './Player.css';
import defaultAlbumArt from '../img/default.jpg';


interface PlayerProps {
    // musicInfo: any[];
}

interface PlayerState {
}

class Player extends React.Component<PlayerProps,PlayerState> {

    constructor(props: PlayerProps) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return <Queue />
    }
}

export default Player;
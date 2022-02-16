import React from 'react';
import './Player.css';

interface PlayerProps {
    // musicInfo: any[];
}

class Player extends React.Component<PlayerProps> {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: null
    //     };
    // }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_HOST_URL}/get_song_info`)
        .then(response => response.json())
        .then((object) => {
            console.log(object)
            this.setState({
                data: object
            });
        })
    }

    render() {
        // const { data } = this.props;
      return <p>test_text</p>;
    }
  }

export default Player;
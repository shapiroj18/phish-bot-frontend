import React, { useEffect, useState } from 'react';
import { Queue } from './Queue'
import { AlbumArt } from './AlbumArt'
import defaultAlbumArt from '../img/default.jpg';


const defaultQueue = [
        {
            "name": "Twist",
            "artist": "Phish",
            "url": "http://phish.in/audio/000/020/578/20578.mp3",
            "date": "2000-06-14"
        },
        {
            "name": "Jam",
            "artist": "Phish",
            "url": "http://phish.in/audio/000/020/579/20579.mp3",
            "date": "2000-06-14"
        }
    ]

export function Player() {

    const [currentSongDate, setcurrentSongDate] = useState<string>(defaultQueue[0].date);
    const [currentSongName, setcurrentSongName] = useState<string>(defaultQueue[0].name);
    const [currentSongURL, setcurrentSongURL] = useState<string>(defaultQueue[0].url);
    const [albumCover, setAlbumCover] = useState<string>(defaultAlbumArt);
    const [queue, setQueue] = useState<any[]>(defaultQueue);

    function getAlbumCover (songDate: string | null): void {
        try {
            fetch(`${process.env.REACT_APP_HOST_URL}/get_album_art?song_date=${songDate}`)
            .then(response => {
                if (response.status === 200) {
                    response.blob()
                    .then((imageBlob) => {
                        const imageObjectURL = URL.createObjectURL(imageBlob);
                        setAlbumCover(imageObjectURL)
                    })
                } else {
                    console.log(`Status Code: ${response.status}`)
                    setAlbumCover(defaultAlbumArt)
                }
            })
                
        } catch (err) {
            console.log(err)
            setAlbumCover(defaultAlbumArt)
        }
    }

    function getQueueItems (): void {
        try {
            fetch(`${process.env.REACT_APP_HOST_URL}/get_song_info`)
            .then(response => {
                if (response.status === 200) {
                    response.json()
                    .then((object) => {
                        setQueue(JSON.parse(object))
                    })
                } else {
                    console.log(`Status Code: ${response.status}`)
                    setQueue(defaultQueue)
                }
            })
                
        } catch (err) {
            console.log(err)
            setQueue(defaultQueue)
        }
    }

    function playSong(audioTune: HTMLAudioElement) {
                updateCurrentSong()
                audioTune.play();
            }

    function updateCurrentSong (): void {

        if (queue) {
            setcurrentSongName(queue[0].name)
            setcurrentSongDate(queue[0].date)
            setcurrentSongURL(queue[0].url)
            getAlbumCover(currentSongDate)
        }
    }

    useEffect(() => {
        // no arguments passed to second function essentially says that useEffect won't be called after initialization, since no variables to watch
        getQueueItems()
    }, [])


    return (
        <div>
            <div className="grid grid-flow-row auto-rows-max justify-center">
                <div> 
                    <AlbumArt albumCover={albumCover}/>
                </div>
                <div className="border-2 grid justify-center">
                    {currentSongName} {currentSongDate} <button onClick={() => playSong(new Audio(currentSongURL))}>Play</button>
                </div>
            </div>
        <Queue queue={queue}/>
        </div>
    );
   }
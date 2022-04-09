import React, { useEffect, useState, useRef } from 'react';
import { Queue } from './Queue'
import { AlbumArt } from './AlbumArt'
import defaultAlbumArt from '../img/albumart/default.jpg';
import playButton from '../img/icons/music/play.svg'
import pauseButton from '../img/icons/music/pause.svg'

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
    const [songState, setSongState] = useState<string>('pause');
    const [albumArtSize, setAlbumArtSize] = useState<number>(60)

    let currentSong = useRef(new Audio(currentSongURL))

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

    function updateCurrentSong (): void {

        if (queue) {
            setcurrentSongName(queue[0].name)
            setcurrentSongDate(queue[0].date)
            setcurrentSongURL(queue[0].url)
        }
    }

    function updateAlbumCover (): void {
        getAlbumCover(currentSongDate)
    }

    useEffect(() => {
        getQueueItems()
    }, [])

    useEffect(() => {
        if (songState === 'play' && currentSong.current.paused) {
            currentSong.current.play();
        } else if (songState === 'pause') {
            currentSong.current.pause();
        }
    }, [songState])

    useEffect(() => {
        updateAlbumCover()
    }, [currentSongDate])

    useEffect(() => {
        updateCurrentSong()
    }, [queue])


    return (
        <div>
            <div className="grid grid-cols-12">
                {/* w-1/5 h-2/5 ml-56*/}
                <div className="col-start-0 col-span-2"></div>
                <div className={`relative w-${albumArtSize} h-${albumArtSize} col-start-3`}>
                    <div className="z-30 absolute bottom-0 left-0"> 
                        <AlbumArt albumCover={albumCover}/>
                    </div>
                    <div className="z-20 absolute -top-4 left-6 grid gap-2 grid-cols-10">
                        { 
                            [...Array(40)].map((e, i) => <div className={`w-0.5 h-0.5 bg-magenta rounded-full`} key={i}></div>)
                        }
                    </div>
                     <div className="z-20 absolute -top-10 -right-10">
                        <div className={`w-24 h-24 border border-magenta rounded-full`}></div>
                    </div>
                    <div className="z-10 absolute -bottom-12 -left-12">
                        <div className={`w-60 h-60 bg-medium-light-red-orange rounded-full`}></div>
                    </div>
                    <div className="z-20 absolute -bottom-16 -left-16">
                        <div className={`w-24 h-24 bg-medium-light-brown rounded-full`}></div>
                    </div>
                    <div className="col-start-5 col-span-9 absolute -right-36">
                        <div className="pt-10">
                            <div className="text-3xl">
                            {currentSongName}
                            </div>
                            <div className="text-lg text-magenta">
                            {currentSongDate}
                            </div>
                            <div className="h-14"></div>
                            <div>
                            { songState === 'pause' &&
                                <input type="image" className="h-14" onClick={() => setSongState('play')} src={playButton}></input>
                            }   
                            { songState === 'play' &&
                                <input type="image" className="h-14" onClick={() => setSongState('pause')} src={pauseButton}></input>
                            }   
                            </div>

                        </div>
                    </div>
                    {/* <button className="" onClick={() => playSong(currentSong)}>Play</button>
                    <button className="" onClick={() => pauseSong(currentSong)}>Pause</button> */}
                </div>
            </div>
        <Queue queue={queue}/>
        </div>
    );
   }
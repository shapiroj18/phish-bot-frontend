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
    const [albumArtSize, setAlbumArtSize] = useState<number>(60)

    let currentSong = new Audio(currentSongURL)

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

    function pauseSong(audioTune: HTMLAudioElement) {
                updateCurrentSong()
                audioTune.pause();
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
        updateAlbumCover()
    }, [currentSongDate])

    useEffect(() => {
        updateCurrentSong()
    }, [queue])


    return (
        <div>
            <div>
                {/* w-1/5 h-2/5 */}
                <div className={`relative w-${albumArtSize} h-${albumArtSize} ml-56`}>
                    <div className="z-30 absolute bottom-0 left-0"> 
                        <AlbumArt albumCover={albumCover}/>
                    </div>
                    <div className="z-20 absolute -top-4 left-6 grid gap-2 grid-cols-10">
                        { 
                            [...Array(40)].map((e, i) => <div className={`w-0.5 h-0.5 bg-magenta rounded-full`}></div>)
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
                </div>
                <div className="">
                    {currentSongName} {currentSongDate} 
                    <button className="" onClick={() => playSong(currentSong)}>Play</button>
                    <button className="" onClick={() => pauseSong(currentSong)}>Pause</button>
                </div>
            </div>
        <Queue queue={queue}/>
        </div>
    );
   }
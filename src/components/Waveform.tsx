import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import playButton from '../img/icons/music/play.svg'
import pauseButton from '../img/icons/music/pause.svg'

const formWaveSurverOptions = (ref: any) => ({
    container: ref,
    waveColor: "#765c71",
    progressColor: "#fee3b8",
    cursorWidth: 0,
    barWidth: 2,
    // barRadius: 20,
    responsive: true,
    normalize: true,
})

export function Waveform({audio}: {audio: string}) {

    const waveformRef = useRef(null);
    const waveSurferRef = useRef<WaveSurfer|null>(null);
    const [songPlayState, setSongPlayState] = useState<boolean>(false);


    useEffect(() => {

        const options = formWaveSurverOptions(waveformRef.current);
        const wavesurfer = waveSurferRef.current = WaveSurfer.create(options);
        wavesurfer.load(audio)
        wavesurfer.on('ready', () => {
            waveSurferRef.current = wavesurfer;
        })

        return () => waveSurferRef.current?.destroy()
    }, [audio]);

    return (
        <div className="grid grid-cols-2">
            <div className="">
                <button onClick={() => {
                    waveSurferRef.current?.playPause()
                
                    console.log(waveSurferRef.current)
                    setSongPlayState(!songPlayState)
                    }} type="button">
                    { songPlayState === false &&
                        <img className="h-14" src={playButton}></img>
                    }   
                    { songPlayState === true &&
                        <img className="h-14" src={pauseButton}></img>
                    }     
                </button>
            </div>
            <div ref={waveformRef}></div>
        </div>
    );
   }
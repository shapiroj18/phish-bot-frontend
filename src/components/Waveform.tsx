import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const formWaveSurverOptions = (ref: any) => ({
    container: ref,
    waveColor: "#fee3b8",
    progressColor: "#fee3b8",
    cursorColor: "#fee3b8",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    normalize: true,
    partialRender: true
})

export function Waveform({audio}: {audio: string}) {

    const waveformRef = useRef(null);
    const waveSurfer = useRef<WaveSurfer|null>(null);

    useEffect(() => {

        const options = formWaveSurverOptions(waveformRef.current);
        const wavesurfer = waveSurfer.current = WaveSurfer.create(options);
        waveSurfer.current.load(audio)
        waveSurfer.current.on('ready', () => {
            waveSurfer.current = wavesurfer;
        })

        return () => waveSurfer.current?.destroy()
    }, [audio]);

    return (
        <div ref={waveformRef}></div>
    );
   }
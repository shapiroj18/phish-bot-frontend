import React from 'react'

export function AlbumArt({albumCover}: {albumCover: string}) { 
    return (
        <div className="">
            <img className="w-auto max-w-sm" src={ albumCover } alt="album art" />
        </div>
    );
   }

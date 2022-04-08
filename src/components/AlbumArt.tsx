import React from 'react'

export function AlbumArt({albumCover}: {albumCover: string}) { 
    return (
        <div className="">
            <img className="h-auto w-1/5" src={ albumCover } alt="album art" />
        </div>
    );
   }

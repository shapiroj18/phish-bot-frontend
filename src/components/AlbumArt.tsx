import React from 'react'

export function AlbumArt({albumCover}: {albumCover: string}) { 
    return (
        <div className="">
            <img className="w-96 border-2" src={ albumCover } alt="album art" />
        </div>
    );
   }

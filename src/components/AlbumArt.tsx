import React from 'react'

export function AlbumArt({albumCover}: {albumCover: string}) { 
    return (
        <div className=""> 
            <img className="object-scale-down" src={ albumCover } alt="album art" />
        </div>
    );
   }

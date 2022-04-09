import React from 'react'

export function AlbumArt({albumCover}: {albumCover: string}) { 
    return (
        <div className=""> 
            <img className="" src={ albumCover } alt="album art" />
        </div>
    );
   }

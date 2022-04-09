import React from 'react'
import { Navigation } from './Navigation';
import { Player } from './Player'

export function Desktop() { 
    return (
        <div className="bg-magenta h-screen flex justify-center items-center justify-items-stretch">
            <div className="bg-medium-dark-magenta w-11/12 h-4/6 rounded text-off-white">
                <div className="">
                    <Navigation />
                </div>
                <div className="">
                    <Player />
                </div>
            </div>
        </div>
    );
   }

import React from 'react'

export function Circle({size, color}: {size: number, color: string}) { 
    return (
        <div className={`w-${size} h-${size} ${color} rounded-full`}>
        </div>
    );
   }

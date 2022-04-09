import React from 'react';

export function Queue({queue}: {queue: any[]}) {

    const queueItems = queue.map((queueitem) =>
        <li key={queueitem.url}>
            {queueitem.name}
        </li>
    );

    return (
        <div>
        <ul className="">
            {queueItems}
        </ul>
        </div>
    );
   }
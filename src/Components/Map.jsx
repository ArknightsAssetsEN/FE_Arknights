import React, { useEffect, useState } from 'react'
import { getTileColorClass } from '../constants/tileKey';

export default function Map({ mapData }) {
    console.log('Map component data:', mapData);
    
  return (
    <div className="inline-block">
      {mapData.map&&mapData.map.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
                const tile = mapData.tiles[cell];
                const tileKey = tile?.tileKey || 'unknown';
                const colorClass = getTileColorClass(tileKey);
                return (
                    <div
                        key={colIndex}
                        className={`w-10 h-10 border border-gray-300 flex items-center justify-center text-[10px] ${colorClass}`}
                        title={tileKey}
                    >
                        {/* {mapData.tiles[cell].tileKey} */}
                        {tileKey.replace("tile_", "")}
                    </div>
                )
            })}
        </div>
      ))}
    </div>
  );
}

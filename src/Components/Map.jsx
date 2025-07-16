import React, { useEffect, useState } from 'react';
import { getTileColorClass } from '../constants/tileKey';

export default function Map({ mapData }) {
  const [tileSize, setTileSize] = useState(40); // fallback size
  const mapRows = mapData?.map || [];
  const tiles = mapData?.tiles || {};
  const numRows = mapRows.length;
  const numCols = mapRows[0]?.length || 0;

  useEffect(() => {
    const calculateTileSize = () => {
      const maxWidth = window.innerWidth * 0.5;
      const maxHeight = window.innerHeight * 0.5;

      const widthPerTile = Math.floor(maxWidth / numCols);
      const heightPerTile = Math.floor(maxHeight / numRows);
      const finalSize = Math.min(widthPerTile, heightPerTile);

      setTileSize(finalSize);
    };

    calculateTileSize();
    window.addEventListener('resize', calculateTileSize);
    return () => window.removeEventListener('resize', calculateTileSize);
  }, [numCols, numRows]);

  return (
    <div className="w-screen flex items-center justify-center">
      <div className="overflow-hidden">
        {mapRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const tile = tiles[cell];
              const tileKey = tile?.tileKey || 'unknown';
              const colorClass = getTileColorClass(tileKey);
              return (
                <div
                  key={colIndex}
                  className={`border border-gray-300 flex items-center justify-center text-[10px] ${colorClass}`}
                  style={{
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    fontSize: `${tileSize * 0.25}px`,
                  }}
                  title={tileKey}
                >
                  {tileKey.replace("tile_", "")}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

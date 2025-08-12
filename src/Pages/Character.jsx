import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Application, Assets } from 'pixi.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';

export default function Character() {
    const navigate = useNavigate();
    const [characterData, setCharacterData] = useState([]);
    const [characterSelect, setCharacterSelect] = useState("");
    const [character, setCharacter] = useState({});
    const pixiApp = new Application();

    useEffect(() => {
        fetch(import.meta.env.VITE_Arknights_URL + '/api/characters/findAllForGacha')
            .then(response => response.json())
            .then(data => {
                setCharacterData(data);
                setCharacterSelect(data[0].id);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, []);

    const draw_view = async () => {
        await pixiApp.init({
            width: 800,
            height: 600,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x2c3e50,
            hello: true,
        })

        const container = document.getElementById("spine-container");
        if (container) {
            container.innerHTML = "";
            container.appendChild(pixiApp.canvas);
        }

        // Assets.add({ alias: "skel_file", src: "/assets/data/battle/char_010_chen/char_010_chen.skel" });
        // Assets.add({ alias: "atlas_file", src: "/assets/data/battle/char_010_chen/char_010_chen.atlas" });
        // await Assets.load(["skel_file", "atlas_file"]);

        Assets.add({ alias: "skel_file", src: "/assets/data/test/spineboy-pro.skel" });
        Assets.add({ alias: "atlas_file", src: "/assets/data/test/spineboy-pma.atlas" });
        await Assets.load(["skel_file", "atlas_file"]);

        console.log("Assets loaded successfully", Assets.get("skel_file"), Assets.get("atlas_file"));
        
        const amiya = Spine.from({
            atlas: "atlas_file",
            skeleton: "skel_file",
            scale: 0.5,
        });

        amiya.state.data.defaultMix = 0.2;

        amiya.x = 800 / 2;
        amiya.y = 600 / 2 + amiya.getBounds().height / 2;

        amiya.state.setAnimation(0, "run", true);

        pixiApp.stage.addChild(amiya);
        
    }

    return (
        <div>
            <div className="flex items-center bg-gray-100 p-1">
                {/* <h1 className="text-4xl font-bold">Map: </h1> */}
                <img src="/arknights_logo.svg" alt="" className='w-[60px]' onClick={()=>navigate("/")}/>

                <select className="p-2 border rounded" onChange={(e) => setCharacterSelect(e.target.value)}>
                    {characterData.map((map, index) => {
                        return (
                            <option key={index} value={map.id || map}>
                                {map.name}
                            </option>
                        )
                    })}
                </select>
                <button className="p-2 bg-blue-500 text-white rounded ml-2" onClick={draw_view} />
            </div>

            <div className="flex justify-center items-center mt-4" >
                {/* <img src="./../assets/data/battle/char_002_amiya/char_002_amiya.png" alt="" className='w-[60px]'/> */}
                <div id='spine-container' className='w-[400px] h-[400px]'>

                </div>
            </div>
        </div>
    );
}
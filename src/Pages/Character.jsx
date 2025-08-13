import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Application, Assets } from 'pixi.js';
import { Spine } from '@pixi-spine/all-3.8';

export default function Character() {
    const navigate = useNavigate();
    const [characterData, setCharacterData] = useState([]);
    const [characterSelect, setCharacterSelect] = useState("char_010_chen");
    const [character, setCharacter] = useState({});
    // const pixiApp = new Application();

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

    const draw_view = async (character) => {
        const pixiApp = new Application({
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
            container.appendChild(pixiApp.view);
        }

        // Assets.add({ alias: "skel_file", src: "/assets/data/battle/char_010_chen/char_010_chen.skel" });
        // Assets.add({ alias: "atlas_file", src: "/assets/data/battle/char_010_chen/char_010_chen.atlas" });
        // await Assets.load(["skel_file", "atlas_file"]);

        const spineData = await Assets.load({
            src: "/assets/data/battle/" + character + "/" + character + ".skel",
            // data: {
            //     spineAtlasFile: "/assets/data/battle/char_010_chen/char_010_chen.atlas",
            //     imagePath: "/assets/data/battle/char_010_chen/char_010_chen.png",
            // },
            loadParser: "spineBinaryData",
        });


        const amiya = new Spine(spineData.spineData);

        amiya.state.data.defaultMix = 0.2;

        amiya.x = 800 / 2;
        amiya.y = 600 / 2 + amiya.getBounds().height / 2;

        console.log(amiya.spineData.animations.map(a => a.name));

        // amiya.state.setAnimation(0, "Attack", true);

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
                <button className="p-2 bg-blue-500 text-white rounded ml-2" onClick={draw_view(characterSelect)} >Load Spine</button>
            </div>

            <div className="flex justify-center items-center mt-4" >
                {/* <img src="./../assets/data/battle/char_002_amiya/char_002_amiya.png" alt="" className='w-[60px]'/> */}
                <div id='spine-container' className='w-[400px] h-[400px]'>

                </div>
            </div>
        </div>
    );
}

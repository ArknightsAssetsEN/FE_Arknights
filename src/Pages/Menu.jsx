import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../Components/Logo';
import { text } from '@fortawesome/fontawesome-svg-core';

export default function Menu() {
    const navigate = useNavigate();

    const [dataJson, setDataJson] = useState({});

    const [characterData, setCharacterData] = useState([]);
    const [characterSelect, setCharacterSelect] = useState("");
    const [character, setCharacter] = useState(null);


    // Fetch data.json from the public folder
    useEffect(() => {
        fetch(import.meta.env.VITE_Arknights_Data_Json)
        .then(response => response.json())
        .then(data => {
            setDataJson(data);
            const names = Object.keys(data.arts.characters);
            setCharacterData(names);
            randomCharacter(names);
            
        })
        .catch(error => {
            console.error('Error fetching home data:', error);
        });
    }, []);


    // Function to get a random character from the characterData array
    const randomCharacter = (data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCharacterSelect(data[randomIndex]);
        return characterSelect;
    }

    function collectFiles(obj, basePath = "") {
        let files = [];

        for (const key in obj) {
            const value = obj[key];

            if (key === "files" && Array.isArray(value)) {
                // encode filename để tránh ký tự #, space,...
                value.forEach(file => files.push(`${basePath}${encodeURIComponent(file)}`));
            } 
            else if (typeof value === "object" && value !== null) {
                // đi vào thư mục con, thêm tên key vào path
                const newBase = `${basePath}${key}/`;
                files.push(...collectFiles(value, newBase));
            }
        }

        return files;
    }


    useEffect(() => {
        if (characterSelect) {
            const basePath = "data/arts/characters/" + encodeURIComponent(characterSelect) + "/";
            const allFiles = collectFiles(dataJson.arts.characters[characterSelect], basePath);

            setCharacter({
                name: characterSelect,
                files: allFiles,
            })
            console.log({
                name: characterSelect,
                files: allFiles,
            });
            
        }

    }, [characterSelect]);


    

    return (
        <div className='h-screen flex justify-center overflow-hidden relative' >

            {/* Background image */}
            {character?.files?.length > 0 && (
                <div
                className="absolute bottom-48 right-96 bg-cover bg-center -z-0 opacity-70"
                style={{
                    width: "400px",
                    height: "600px",
                    backgroundImage: `url(${import.meta.env.VITE_Arknights_Data}/${character.files[0]})`,
                }}
                />
            )}

            <div className="relative flex flex-col items-center p-1 mt-36">
                <Logo size="text-5xl"/>
                <button
                    className="bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => {
                        const character = randomCharacter(characterData);
                    }}
                >
                    Random Character
                </button>                
            </div>
            
        </div>
    );
}

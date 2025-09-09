import { useContext, useEffect, useState } from 'react'
import { MaterialUISwitch } from './MaterialUISwitch';
import { useArknights } from '../Contexts/Context';


export default function Theme() {
    const { dark, setDark } = useArknights();

    return (
        <div className="flex justify-center">
            <MaterialUISwitch sx={{ m: 1 }} checked={dark} onChange={() => setDark(!dark)} />
        </div>
        
    )
}
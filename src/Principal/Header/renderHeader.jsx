import { useState, useEffect } from 'react';
import Header from './header.jsx';
import HeaderMobile from './headerMobile.jsx';
import { useTienda } from '../../contextTienda.jsx';

export default function RenderHeader() {
    const { isMobile } = useTienda();
    
    return (
        <>
            {isMobile ? <HeaderMobile /> : <Header />}
        </>
    );
}
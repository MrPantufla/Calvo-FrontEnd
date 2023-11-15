import { useState, useEffect } from 'react';
import Header from './header.jsx';
import HeaderMobile from './headerMobile';

export default function RenderHeader() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? <HeaderMobile /> : <Header />}
        </>
    );
}
import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import RenderHeader from './Header/renderHeader.jsx';
import './homePage.css';

export default function HomePage(){
    const mobile = (window.innerWidth < 768);
    return(
        <div className="contenedorHomePage">
            <RenderHeader/>
            <Body/>
            <Footer/>
        </div>
    );
}
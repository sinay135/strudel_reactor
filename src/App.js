import './App.css';
import { useState } from "react";
import Screens from './components/Screens';
import useStrudel from './components/useStrudel';
import NavBar from './components/NavBar';

export default function StrudelDemo() {
    const globalEditor = useStrudel();

    // textarea toggle
    const [isDisplayChecked, setDisplayChecked] = useState(true);
    const displayToggle = (e) => setDisplayChecked(e.target.checked);

    // textarea col size
    const [displaySize, setDisplaySize] = useState(3);
    const displaySizeToggle = (e) => setDisplaySize(displaySize == 5 ? 3 : 5); 
    
    // control toggle
    const [isControlChecked, setControlChecked] = useState(true);
    const controlToggle = (e) => {
        setControlChecked(e.target.checked);
        displaySizeToggle();
    }
    
    // pause play
    const [isPlaying, setIsPlaying] = useState(false);
    const handleToggle = () => {
        if (isPlaying) {
            globalEditor.stop();
            setIsPlaying(false);
        } else {
            globalEditor.evaluate();
            setIsPlaying(true);
        }
    }
    
    return (
        <div style={{backgroundColor: 'rgb(20, 20, 20)', color: 'lightgreen', overflowX: "hidden", minHeight: '100vh'}}>
            <h2 className="ps-3"></h2>
            <main>
                <div className="container-fluid">
                    <div className="col pt-1">
                        <NavBar isDisplayChecked={isDisplayChecked}     /* items in Navbar */
                                displayToggle={displayToggle}
                                isControlChecked={isControlChecked}
                                controlToggle={controlToggle}
                                isPlaying={isPlaying}
                                handleToggle={handleToggle}
                                globalEditor={globalEditor}/>
                    </div>

                    <Screens    globalEditor={globalEditor}             /* controls, textarea and canvas */
                                displayChecked={isDisplayChecked} 
                                displaySize={displaySize} 
                                controlChecked={isControlChecked} />
                </div>
            </main >
        </div >
    );
}
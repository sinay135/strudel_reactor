import './App.css';
import { useState } from "react";
import Screens from './components/Screens';
import PlayStop from './components/PlayStop';
import Volume from './components/Volume';
import ProcPlay from './components/ProcPlay';
import CPM from './components/CPM';
import DisplayButtons from './components/DisplayButtons';
import useStrudel, {Proc} from './components/useStrudel';

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
                        <nav className='d-flex align-items-center'>
                            <button className="btn btn-dark py-0" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopRightRadius: "0", color: 'lightgreen', fontSize: '1.5em', whiteSpace: "nowrap", height: "37.5px"}}><strong>Strudel Demo</strong></button>
                            <DisplayButtons     isDisplayChecked={isDisplayChecked} onDisplayToggle={displayToggle} 
                                                isControlChecked={isControlChecked} onControlToggle={controlToggle} />
                            <ProcPlay />                                                                {/* process button */}
                            <PlayStop onToggle={handleToggle} isPlaying={isPlaying} />                  {/* pause and play */}
                            <Volume />
                            <CPM globalEditor={globalEditor} handleToggle={handleToggle}/>              {/* CPM input */}
                        </nav>
                    </div>
                    
                    <Screens    globalEditor={globalEditor}
                                displayChecked={isDisplayChecked} 
                                displaySize={displaySize} 
                                controlChecked={isControlChecked} />                                    {/* textarea and canvas */}
                </div>
            </main >
        </div >
    );
}
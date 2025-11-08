import './App.css';
import { useEffect, useRef, useState } from "react";
import Hush from './components/Hush';
import Editors from './components/Editors';
import PlayStop from './components/PlayStop';
import Volume from './components/Volume';
import ProcPlay from './components/ProcPlay';
import CPM from './components/CPM';
import DisplayButtons from './components/DisplayButtons';
import useStrudel, {Proc} from './components/useStrudel';

export default function StrudelDemo() {
    const globalEditor = useStrudel();

    // display toggle
    const [isDisplayChecked, setDisplayChecked] = useState(true);
    const displayToggle = (e) => setDisplayChecked(e.target.checked);

    const [displaySize, setDisplaySize] = useState(3);
    const [editorSize, setEditorSize] = useState(6);
    const displaySizeToggle = (e) => setDisplaySize(displaySize == 5 ? 3 : 5); 

    // control toggle
    const [isControlChecked, setControlChecked] = useState(true);
    const controlToggle = (e) => {
        setControlChecked(e.target.checked);
        displaySizeToggle();
    }

    // Adjust editor size with toggles
    useEffect(() => {
        if (!isDisplayChecked && !isControlChecked) {
            setEditorSize(11);
        } else if (isDisplayChecked && !isControlChecked) {
            setEditorSize(6);
        } else if (!isDisplayChecked && isControlChecked) {
            setEditorSize(9);
        } else {
            setEditorSize(6);
        }
    }, [isDisplayChecked, isControlChecked]);

    // volume bar
    const [volume, setVolume] = useState(80);
    
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
                            <ProcPlay />                                                                {/* process */}
                            <PlayStop onToggle={handleToggle} isPlaying={isPlaying} />                  {/* pause and play */}
                            <Volume volume={volume} setVolume={setVolume} />
                            <CPM globalEditor={globalEditor} handleToggle={handleToggle}/>                                           {/* CPM input */}
                        </nav>
                    </div>
                    
                    <Editors    globalEditor={globalEditor}
                                displayChecked={isDisplayChecked} 
                                displaySize={displaySize} 
                                controlChecked={isControlChecked}
                                editorSize={editorSize} />                                              {/* textarea and canvas */}
                </div>
            </main >
        </div >
    );
}
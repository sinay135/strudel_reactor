import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import Hush from './components/Hush';
import Editors from './components/Editors';
import PlayStop from './components/PlayStop';
import Volume from './components/Volume';
import ProcPlay from './components/ProcPlay';
import CPM from './components/CPM';
import Display from './components/Display';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [songText, setSongText] = useState(stranger_tune)

    // display toggle
    const [isDisplayChecked, setDisplayChecked] = useState(true);
    const displayToggle = (e) => setDisplayChecked(e.target.checked);

    const [displaySize, setDisplaySize] = useState(5);
    const [editorSize, setEditorSize] = useState(6);
    const displaySizeToggle = (e) => setDisplaySize(displaySize == 5 ? 3 : 5); 

    // control toggle
    const [isControlChecked, setControlChecked] = useState(false);
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

    // cpm
    const [cpm, setCpm] = useState(30);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl

            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 10;
            canvas.height = canvas.height * 4.35;
            const drawContext = canvas.getContext('2d');
            const drawTime = [0, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ 
                    haps, 
                    time, 
                    ctx: drawContext, 
                    drawTime, 
                    fold: 0, 
                    playheadColor: '#00ff99',
                    fillActive: true,
                    strokeActive: false, 
                    labels: true,
                    cycles: 5
                }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            window.globalEditor = globalEditor;
            document.getElementById('proc').value = stranger_tune;
            document.getElementById('process').addEventListener('click', () => Proc());
        }
        globalEditor.setCode(songText);
    }, [songText]);

    useEffect(() => {
        const textArea = document.getElementById("proc");
        if (!textArea) return;

        // Replace existing setcpm(n) call, or add it if missing
        let text = textArea.value;
        if (text.match(/setcpm\(\d*\)/)) {
            text = text.replace(/setcpm\(\d*\)/, `setcpm(${cpm})`);
        } else {
            text = `setcpm(${cpm})\n` + text;
        }
        textArea.value = text;
        globalEditor.setCode(text);
        Proc();
        globalEditor.evaluate();
        handleToggle();
    }, [cpm]);


    return (
        <div style={{backgroundColor: 'rgb(20, 20, 20)', color: 'lightgreen', overflowX: "hidden"}}>
            <h2 className="ps-3"></h2>
            <main>
                <div className="container-fluid">
                    <div className="col pt-2">
                        <nav className='d-flex align-items-center'>
                            <button className="btn btn-dark py-0" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopRightRadius: "0", color: 'lightgreen', fontSize: '1.5em', whiteSpace: "nowrap", height: "37.5px"}}><strong>Strudel Demo</strong></button>
                            <Display    isDisplayChecked={isDisplayChecked} onDisplayToggle={displayToggle} 
                                        isControlChecked={isControlChecked} onControlToggle={controlToggle} />
                            <ProcPlay />                                                                {/* process */}
                            <PlayStop onToggle={handleToggle} isPlaying={isPlaying} />                  {/* pause and play */}
                            <Volume volume={volume} setVolume={setVolume} />
                            <CPM cpm={cpm} setCpm={setCpm} />                                           {/* CPM input */}
                        </nav>
                    </div>
                    
                    <Editors    defaultValue={songText} 
                                onChange={(e) => setSongText(e.target.value)} 
                                displayChecked={isDisplayChecked} 
                                displaySize={displaySize} 
                                controlChecked={isControlChecked}
                                editorSize={editorSize} />   {/* textarea and canvas */}
                </div>
                <div className="col-md-4">
                    <Hush />
                </div>
            </main >
        </div >
    );
}
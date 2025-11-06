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
import ProcPlay from './components/ProcPlay';
import CPM from './components/CPM';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function SetupButtons() {
    document.getElementById('process').addEventListener('click', () => Proc());
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    })
}

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
    const [cpm, setCpm] = useState(30);

    const handlePlay = () => {
        globalEditor.evaluate()
    }
    const handleStop = () => {
        globalEditor.stop()
    }

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //init canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 3;
                canvas.height = canvas.height * 4.19;
                const drawContext = canvas.getContext('2d');
                const drawTime = [0, 2]; // time window of drawn haps
                globalEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    drawTime,
                    onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
                
            document.getElementById('proc').value = stranger_tune;
        }
        SetupButtons();
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
    }, [cpm]);



    return (
        <div style={{backgroundColor: 'rgb(20, 20, 20)', color: 'lightgreen', overflowX: "hidden"}}>
            <h2 className="ps-3"></h2>
            <main>
                <div className="container-fluid">
                    <div className="col ps-1 pt-2">
                        <nav>
                            <button className="btn btn-dark col py-0" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", color: 'lightgreen', fontSize: '1.5em'}}><strong>Strudel Demo</strong></button>
                            <ProcPlay />
                            <PlayStop onPlay={handlePlay} onStop={handleStop} />
                        </nav>
                    </div>
                    <Editors defaultValue={songText} onChange={(e) => setSongText(e.target.value)} /> {/* textarea and canvas */}
                </div>
                <div className="col-md-4">
                    <CPM cpm={cpm} setCpm={setCpm} />
                    <Hush />
                </div>
            </main >
        </div >
    );
}
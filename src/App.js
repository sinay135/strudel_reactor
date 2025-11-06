import './App.css';
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => globalEditor.Proc());
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    }
    )
}

export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
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
                
            document.getElementById('proc').value = stranger_tune
            SetupButtons()
            Proc()
        }

    }, []);


    return (
        <div style={{backgroundColor: 'rgb(20, 20, 20)', color: 'lightgreen', overflowX: "hidden"}}>
            <h2 className="ps-3"></h2>
            <main>
                <div className="container-fluid">

                    <div className="col ps-1 pt-2">
                        <nav>
                            <button className="btn btn-secondary col py-0" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", color: 'lightgreen', fontSize: '1.5em'}}><strong>Strudel Demo</strong></button>
                            <button id="process" className="btn btn-dark col-md-1" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Preprocess</button>
                            <button id="process_play" className="btn btn-dark col-md-1" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Proc & Play</button>
                            <button id="play" className="btn btn-dark col-md-1" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Play</button>
                            <button id="stop" className="btn btn-dark col-md-1" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Stop</button>
                        </nav>
                    </div>
                    
                    <div className="row">
                        <div className="col-11">
                            <div className="ps-1" style={{ maxHeight: '58vh', overflowY: 'auto'}}>
                                <textarea className="rounded-0 form-control" style={{borderTopRightRadius: "1", scrollbarWidth: "thin", scrollbarColor: 'grey rgba(230, 230, 230, 1)'}} rows="8" id="proc" ></textarea>
                            </div>
                            <div className="ps-1 pe-0" style={{ maxHeight: '58vh', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                        </div>

                        <div className="col-1 ps-0">
                            <canvas id="roll"></canvas>
                        </div>
                    </div>
                    

                    
                </div>

                <div className="col-md-4">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            p1: ON
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            p1: HUSH
                        </label>
                    </div>
                </div>
            </main >
        </div >
    );
}
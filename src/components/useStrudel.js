import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import console_monkey_patch from '../console-monkey-patch';

function ProcessText(match, ...args) {
    let replace = "";
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_";
    }

    return replace
}

export function Proc(editor) {
    let proc_text = document.getElementById('proc').value;
    let proc_text_replaced = proc_text.replaceAll('MUTE_', ProcessText);
    ProcessText(proc_text);
    editor.setCode(proc_text_replaced);
}

export default function useStrudel() {
    const [editorInstance, setEditorInstance] = useState(null);
    const hasRun = useRef(false);

    const handleD3Data = (event) => console.log(event.detail);

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
            const editor = new StrudelMirror({
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
            //window.globalEditor = globalEditor;  // Debug
            editor.setCode(stranger_tune);
            document.getElementById('proc').value = stranger_tune;
            document.getElementById('process').addEventListener('click', () => Proc(editor));
            setEditorInstance(editor);
        }
    }, []);

    return editorInstance;
}
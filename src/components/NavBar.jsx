import PlayStop from './navItems/PlayStop';
import Volume from './navItems/Volume';
import Process from './navItems/Process';
import CPM from './navItems/CPM';
import DisplayButtons from './navItems/DisplayButtons';

export default function NavBar( { isDisplayChecked, displayToggle, isControlChecked, controlToggle, isPlaying, handleToggle, globalEditor } ) {
    return (
        <nav className='d-flex align-items-center'>
            <button className="btn btn-dark py-0" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopRightRadius: "0", color: 'lightgreen', fontSize: '1.5em', whiteSpace: "nowrap", height: "37.5px"}}><strong>Strudel Demo</strong></button>
            <DisplayButtons     isDisplayChecked={isDisplayChecked} onDisplayToggle={displayToggle} 
                                isControlChecked={isControlChecked} onControlToggle={controlToggle} />
            <Process />                                                                {/* process button */}
            <PlayStop onToggle={handleToggle} isPlaying={isPlaying} />                  {/* pause and play */}
            <Volume />
            <CPM globalEditor={globalEditor} handleToggle={handleToggle}/>              {/* CPM input */}
        </nav>
    )
}
import { faCirclePause, faCirclePlay, faCircleStop, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
/*
Ide fogjuk bemásolni a linkeket a awesome font-os linkeket, amiket az icons.txt-ben vannak
!!!!!!!!!!!!! kisbetűs library-t kell importálnunk 
és utána library.add és oda bemásoljuk, ilyen formában, ahogy csináltuk 
*/
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faCirclePlay, faCirclePause, faTrashCan, faCircleStop
);

function App() {
  return (
    <AudioPlayer/>
  );
}

export default App;

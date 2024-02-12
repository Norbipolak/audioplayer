/*
Kezelőfelület kinézete ->

audio-player
Lesz egy téglalapszerű valami, amit három részre fogunk osztani, 

player-controls
az egyik(legfelső) a control panel lesz 
ami majd úgy néz ki, hogy a jobb felső sarokban lesz a play és a stop gomb mellette a track indicator, hogy hol tart éppen a szám,
a harmadikban pedig egy hangerő csuszka és a track indicator is egy csuszka lesz

audio-information
alatta az audionak a tulajdonságai, amit éppen játszunk le -> audio-information
ezt is két részre osztjuk az elsőben lesz a cím és az előadó, a másodikban meg, hogy éppen hol tartunk a zenében


tracklist
alatta egy lista a cím és előadó, melette meg az a zene milyen hosszúságú 

tracklist-information
legalul a listának a teljes hossza és mellette, teljesen alul, jobb oldalt pedig egy lista törlés gomb, hogy a teljes listát 
ki lehessen törölni

        <div className="audio-player">
            <div className="player-controls">

            </div>
            <div className="audio-information">

            </div>
            <div className="tracklist">

            </div>
            <div className="tracklist-information">

            </div>
        </div>
Ezután, pedig formázzuk őket css-ben 
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AudioPlayer() {
    /*
    Hogyan tudjuk lejátszani az audionkat -> 
    van egy beépített audioplayer a JavaScriptben
    new Audio()-nak vannak mindenféle tulajdonságai meg metódusai
    */
    const [player, setPlayer] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    /*
    trackList-es tömben, objektumok fognak majd szerepelni és olyan tulajdonságaik lesznek, hogy name és duration 
    */
    const [trackList, setTrackList] = useState([
        {
            name: "Don't fret - Quincas Moreira.mp3",
            duration: "00:02:40"
        }
    ]);

    const play = () => {
        /*
        A tracks mappában vannak zenék(nekem itt nincsen), amit majd le fogunk játszani  
        */
        //player.src = require("../tracks/Don't Fret - Quincas Moreira.mp3"); /*megadjuk az elérési útvonalat*/
        //player.play(); ezzel kell müködtetni, le fogja játszani
        /*
        Itt azt mondjuk, hogyha nem isPlaying (!isPlaying) tehát ha nem volt lejátszva akkor játszja le különben pause, 
        így ha mégegyszer megnyomjuk akkor leáll, de még nem modósul az ikon 
        jelenleg így néz ki az ikonunk -> icon="fa-regular fa-circle-play"
        és erre kell majd modósítanunk -> icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")}/>
     
        A fa-regular az mindegyiknél ugyanaz, és hogyha nem isPlaying van (!isPlaying), akkor rakja hozzá a fa-regular-hoz
        a fa-circle-play-t (a lejátszás gombot) de viszont ha isPlaying van tehát megy a zene akkor rakja hozzá a pause gombot 
        fa-circle-pause
        Az egész így fog kinézni ->
             <FontAwesomeIcon className="pointer" onClick={play}
             icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")}/>   -> internális operátor
        */
        if (!isPlaying)
            player.play(),
    else
            player.pause();
        /*
        play metódus, akkor lesz meghívva, ha rákattintunk a play-re(ikonra), adunk egy onClicket, amiben meghívjuk a play függvényt
             <div className="play-pause-stop">
                 <FontAwesomeIcon className="pointer" onClick={play}
                     icon="fa-regular fa-circle-play" />
         Most betölti nekünk a track-et és ha rányomunk a play gombra, akkor elkezdi nekünk játszani, de jó lenne, ha a play 
         ikounk ha megy a zene, akkor modósulna arra, hogy pause, erre létrehozunk egy isPlaying useState-s változót ->
         const [isPlaying, setIsPlaying] = useState(false);
     
         Az a gond, hogy mindig betölti ujra a track-et és mindig előlről kezdi és nekünk az kellenne, hogy alapból betöltünk valamilyen
         track-ekeket és akkor azt indítjuk el
         Hogyan lehet ezt megcsinálni -> 
         Készítünk egy tracklist useState-s változót 
         -> 
         const [trackList, setTrackList] = useState([
         {
             name:"Don't fret - Quincas Moreira.mp3",
             duration:"00:02:40"
         }
     ]);
         és akkor a függvényen kívül csinálunk egy useEffect-es változót 
        */
        setIsPlaying(ip => !ip);//mindig az ellentetjére váltjuk, ha false volt akkor true lesz, ha true volt akkor false lesz 
    };

    useEffect(() => {
        /*
        Itt, amikor betöltödik minden, akkor a Trancklist 0-dik elemének a name-je töltödik be
        és, akkor nem a play függvényben adjuk meg ezt az elérési útvonalat, hanem már alapból brtöltjük 
        a nulladikat a tracklistből, amit nyilván nem így kézzel töltünk fel mint ezek ->
        <div className="tracklist-element">
            <div>
                PSY - Gangnam Style
            </div>
            <div>
                00:04:53
            </div>
        de ilyenkor ha megnyomjuk a play gombot és leállítjuk(pause), és újra megnyomjuk, hogy play, akkor onnan kezdi ahol befejezte,
        mert, akkor nem töltjük be újból mintha a play függvényben lenne a player.src
        */
        player.src = require(`../tracks/${trackList[0].name}`);
    }, []);

    /*
    Stop gomb, az annyit tesz, hogy mindig a player.pause-t kell meghívni benne, mert nincsen alapból stop metódus
    és itt nem csak pause lesz, hanem vissza kell állítani az elejére a számot  

    Ha kész van minden a stop függvényünkben, akkor már csak azt kell csinálni, hogy a stop ikonra el kell készíteni az onChange-et
    -> 
        <FontAwesomeIcon onClick={stop}
        className="pointer"
            icon="fa-regular fa-circle-stop" />

    ilyenkor már ha megnyomjuk a stop gombot, akkor leáll, de az a gond, hogy mivel, ment a zene és megnyomtuk a stop gpmbot akkor leállt 
    de a play gomb nem változik át play-re, hanem marad pause, mert ott nem érzékeli, hogy megállítottuk a zenét 
    tehát ebben az esetben az isPlaying-et át kell állítani false-ra, mert akkor fog átváltozni az első ikonunk pause-ről play-re
    tehát, ebben az esetben a stop függvényben a isPlaying mindig false lesz -> setIsPlaying(false);
    és ilyenkor minden jol müködik
    */
    const stop = ()=> {
        player.pause();
        player.currentTime = 0; 
        /*
        currentTime azt adja meg, hogy hányadik másodpercnél tartunk és ez Get-vel és Set-vel is 
        tehát ki is tudjuk belőle olvasni és be is tudjuk vele állítani
        */
       setIsPlaying(false);
    };
    /*
    Hangerőállítás, csináltunk egy volume useState-s változót
    const [volume, setVolume] = useState(75); alapból 75-ről fog indulni, mert direkt ugy állítottuk be a volume-ot, hogy 0-100-ig
    value az a volume lesz és egy onChange
    -> 
        <div className="vertical-center">
            <input className="w100" 
            value={volume} onChange={(e)=> adjustVolume(parseFloat(e.target.value))}
            type="range" min={0} max={100} />
        </div>
    */
    adjustVolume = (vol)=> {
        /*
        Itt kapunk egy vol értéket 
        */
       setVolume(vol);
       player.volume = vol/100;
       /*
       player-nek a volume tulajdonsága 0-tól 1-ig kap majd értéket
       és ezért kell leosztani 100-val
       a setVolume, volume az csak késöbb fog változni, itt még nem látunk minden változást 
       ezért kell itt a bemeneti paraméter szerint (vol) megoldani ezt a dolgot
       */
    };


    return (
        <div className="audio-player">
            <div className="player-controls">
                <div className="play-pause-stop">
                    <FontAwesomeIcon className="pointer" onClick={play}
                        icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")} />
                    
                    <FontAwesomeIcon onClick={stop}
                    className="pointer"
                        icon="fa-regular fa-circle-stop" />
                </div>
                <div className="vertical-center">
                    <input className="w100" type="range" min={0} max={100} />
                </div>
                <div className="vertical-center">
                    <input className="w100" 
                    value={volume} onChange={(e)=> setVolume(parseFloat(e.target.value/100))}
                    type="range" min={0} max={100} />
                </div>
            </div>
            <div className="audio-information mb-15">
                <div>
                    Mozart-Requiem
                </div>
                <div>
                    00:02:32
                </div>
            </div>
            <div className="tracklist">
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
                <div className="tracklist-element">
                    <div>
                        PSY - Gangnam Style
                    </div>
                    <div>
                        00:04:53
                    </div>
                </div>
            </div>
            <div className="tracklist-information">
                <div>
                    00:34:55
                </div>
                <div>
                    <FontAwesomeIcon className="pointer"
                        icon="fa-regular-fa-trash-can" />
                </div>
            </div>
        </div>
    );
}

/*
Font Awesome-os ikonok!!!!!!!!!!!!!!!!!!!!

ezeket kimásoljuk innen -> https://fontawesome.com/v5/docs/web/use-with/react
és így, ahogy itt alatta van bemásoljuk a terminal-ba
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome

megnézzük, hogy milyen ikonokra lesz szükségünk 
beírjuk a keresőbe, hogy play és kiválasztjuk, hogy free
ha megvan melyik gombot szeretnénk, akkor rámegyünk, hogy react kiválasztjuk a linkjét és bemásoljuk 
(icons.txt)-ben lesznek 
kimásoltuk oda a play, ,pause, stop, delete gombokat 

!!!!!!!!!!!az App.js-ben importáltuk őket és most 
ide ebbe a div-be kell majd a play és a stop 
    <div className="player-controls">
        <div>

        </div>

ide ilyen formában tesszük be őket -> (ahogy az lementettük az oldalról az icons.txt-be, szóval csak be kell másolni oda)
    <div>
        <FontAwesomeIcon icon="fa-regular fa-circle-play" />
        <FontAwesomeIcon icon="fa-regular fa-circle-stop" />
    </div>

ezek regular-okként tudtuk őket lementeni, ahogy itt felül is látszik és ezeket átírtuk mindenhol solid-ra 
->
<FontAwesomeIcon icon="fa-solid fa-circle-play" />
<FontAwesomeIcon icon="fa-solid fa-circle-pause" />
<FontAwesomeIcon icon="fa-solid fa-circle-stop" />
<FontAwesomeIcon icon="fa-solid fa-trash-can" />
valószínüleg emiatt, amit a App.js-ben van -> import { faCirclePause, faCirclePlay, faCircleStop, faTrashCan } from '@fortawesome/free-solid-svg-icons';

!!!!!!!!!!!!!!!!!!!!!!!!
ezt kell beírni a terminalba, ahhoz, hogy feltelepítsük a ezeket az ikonokat ->
npm install --save @fortawesome/free-regular-svg-icons

és most mindent árírtunk regular-ra

Arra kell figyelni, hogy az App.js-re lementjük ezeket az ikonokat, akkor legyen beimportálva a regular és a solid is 
és akkor a library-be mindent írhatunk, attól nem függően, hogy alapból solid vagy regular-e
library.add(
    faCirclePlay, faCirclePause, faTrashCan, faCircleStop
);

Megformázzuk css-ben a .audio-player-t , majd ebben lévő player control-t is, ami egy grid és háromfelé osztjuk 
az első része megkapta a className="play-pause-stop", mert ebben lesznek ezek a gombok, amiket beleraktunk ebbe a div-be 
ilyen formában ->
    <div className="play-pause-stop"> 
        <FontAwesomeIcon icon="fa-regular fa-circle-play" />
        <FontAwesomeIcon icon="fa-regular fa-circle-stop" />
    </div>
és megformázzuk a play-pause-stop-ot css-ben 

a második része a csuszka lesz, emi egy input mező és a type-ja pedig range!!!!!!! lesz és min és max-val meghatároztuk, hogy mennyitől 
mennyire menjen, input mezőnek csináltunk egy className="w100", hogy felvegye amiben benne van div-nek a 100%-át és 
még az egésznek adtuk egy vertical-center nevő class-t,ami egy display:flex és align items: center, hogy vertikálisan is középen legyen 
->
    <div className="vertical-center">
        <input className="w100" type="range" min={0} max={100}/>
    </div>

a harmadik része az teljesen ugyanaz, mint a második, ez is egy csuszka, ami 0-tól 100-ig megy 
itt fogjuk beállítani a hangerőt -> volume-slider

Ezzel a felső része kész van itt is és css-ben is meg van formázva
***********************************************************************************************************************
most jön a következő az .audio-information
ez egy kétoszható grid lesz, az első fele az lesz, hogy mi a cime és előadója az adott számnak a második fele a grid-nek pedig
az lesz, hogy mennyi idő ez a szám (óra-perc-másodperc formátumban) 
így fog kinézni -> 
    <div className="audio-information">
        <div>
            Mozart-Requiem
        </div>
        <div>
            00:02:32
        </div>
    </div>
és az egészre teszünk (tehát az audio-player-re) egy text-align: center-t, hogy minden, ami benne van az horizontálisan középen legyen

Ez volt a második része
****************************************************************************************************************************
A harmadik része az a tracklist, amit megformázunk css-ben 
Megformáztuk a tracklist-et és ezekben lesznek tracklist-element-ek, amiket ketté osztunk, lesz egy rész amiben a számcím és előadó 
a másikban, pedig a zene hosszúsága, időtartalma
megformázzuk a tracklist-elementet is
<div className="tracklist">
    <div className="tracklist-element">
        <div>
            PSY - Gangnam Style
        </div>
        <div>
            00:04:53
        </div>
    </div>
</div>

és mivel ebből a tracklist-element-ből több is lehet, ezért a tracklistben csináltunk több tracklist-element-et
egyenlőre mégcsak lemásoltuk ezt a részt egymás alá párszor
    <div className="tracklist-element">
        <div>
            PSY - Gangnam Style
        </div>
        <div>
            00:04:53
        </div>
    </div>

És ha esetleg nem férne ki (túl sok ilyen tracklist-element-et raktunk bele), ezt is tudnunk kéne kezelni 
-> 
.tracklist-nek css-ben megadjuk az overflow: auto; tehát ha több element van benne, mint ami kiférne, akkor megjelenik 
a görgetősáv tracklist mellett jobbra, formázása a css-ben
***************************************************************************************************************************

A negyedik lesz a tracklist-information, ami egy ugyanugy egy kétosztható valami 
és mivel az audio-information az teljesen ugyanolyan kinézetű lesz, mint ez a traclist-information, ezért
css-ben csak így megadjuk egymás mellé -> .audio-information, .tracklist-information {

Itt kiírjuk a teljes hosszát a listának és még lesz egy törlés is, ami egy trashcan ikon 
    <div className="tracklist-information">
        <div>
            00:34:55
        </div>
        <div>
            <FontAwesomeIcon className="pointer"
            icon="fa-regular-fa-trash-can"/>
        </div>
    </div>

A formázása az audioplayerünknek megvan 
*/



export default AudioPlayer;
let audio;
let fft;
let noLooping;
let zoomCounter = 1;

function preload(){
    audio = loadSound('ReverbGuitarShort.mp3')
}

function setup(){
    createCanvas(window.innerWidth,window.outerHeight)
    fft = new p5.FFT();
    angleMode(DEGREES)
    colorMode(HSB, 100);
}


function draw(){
    idea1()
    //idea2() WIP
}

function idea1(){
    background(0);
    stroke(255);
    noFill();
    translate (width/2, height/2);

    scale((Math.sin(zoomCounter) + 3))
    zoomCounter += 0.01
    

    const spectrum = fft.analyze();
    const waveform = fft.waveform();

    const spectrumSum = spectrum.reduce((acc, current) => acc + current, 0);
    
    const w = map(spectrumSum, 0, spectrum.length * 180, 60, 150)
    const ss = map(spectrumSum, 0, spectrum.length * 180, 0, 150)
    const sk = map(spectrumSum, 0, spectrum.length * 180, 70, 200)
    
    const c1 = map(spectrumSum, 0, spectrum.length * 180, 0, 30)
    const c2 = map(spectrumSum, 0, spectrum.length * 180, 50, 80)
    const c3 = map(spectrumSum, 0, spectrum.length * 180, 60, 90)
    
    const depth = 5
    for(let i = 0; i < 360 + waveform[0]; i++){
        let rotation = map(spectrum[i], 0, 255, 2, 5 );
        let scaleFactor = map(spectrum[i], 0, 255, 0.99, 1.001 );
        rotate(rotation/2)
        stroke(c1*5,c2,c3)
        ellipse(ss*8, sk, w*depth ,w*depth);
        scale(scaleFactor)
    }
}

let zoom = 1;
function idea2(){
    background(0);
    stroke(255);
    noFill();
    translate (width/2, height/2);
    //translate(0, 0, 500 + zoom*10)
    scale(zoom)
    zoom *= 1.01//0.01
    // if(zoom > 5){
    //     zoom += 3
    // }
    //console.log(zoom)
    const spectrum = fft.analyze();
    const waveform = fft.waveform();
    const spectrumSum = spectrum.reduce((acc, current) => acc + current, 0);
    const w = map(spectrumSum, 0, spectrum.length * 180, 60, 150)
    const ss = map(spectrumSum, 0, spectrum.length * 180, 0, 150)
    const sk = map(spectrumSum, 0, spectrum.length * 180, 70, 200)
    
    const c1 = map(spectrumSum, 0, spectrum.length * 180, 0, 30)
    //const c1 = getFirstElementInInterval(spectrum, 0, 30 )
    const c2 = map(spectrumSum, 0, spectrum.length * 180, 50, 80)
    const c3 = map(spectrumSum, 0, spectrum.length * 180, 60, 90)

    for(let i = ceil(zoom); i < 360 + waveform[0]+ ceil(zoom*10); i++){
        let rotation = map(spectrum[i], 0, 255, 2, 5 );
        let scaleFactor = map(spectrum[i], 0, 255, 0.99, 1.001 );
        let ellipseWidth = map(spectrum[i], 0, 255, 40, 150 );
        let ellipseHeight = map(spectrum[i], 0, 255, 80, 120 );
        
        rotate(rotation)
        ellipse(ss*8, sk, w ,w);
        stroke(c1*5,c2,c3)
        
        scale(-scaleFactor + zoom/10000)
        scale(0.99 + zoom/10000)
        //console.log("scale f", -scaleFactor, " zo",zoom/10000 )
        //console.log(-scaleFactor + zoom/10000)
    }
}


function mouseClicked(){
    if(audio.isPlaying()){
        audio.pause();
    }else{
        audio.play();
    }
}
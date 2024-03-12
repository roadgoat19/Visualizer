import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import p5 from 'p5';

window.p5 = p5;
// eslint-disable-next-line import/first
import './/libraries/p5.sound.js';

const sketch = p5 => {
  let song, fft;

  p5.preload = () => {
    song = p5.loadSound('/public/cryptoyeast.mp3');
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noFill();
    fft = new p5.FFT();
    song.play();
  };

  p5.draw = () => {
    p5.background(0);
    p5.stroke(255);

    let wave = fft.waveform();
    p5.strokeWeight(wave[100] * 50 + 0.6);

    // Drawing three lines representing the waveform
    for (let j = 1; j <= 3; j++) {
      p5.beginShape();
      for (let i = 0; i < p5.width; i++) {
        let index = p5.floor(p5.map(i, 0, p5.width, 0, wave.length));
        let x = i;
        let y = wave[index] * 200 + p5.height * (j * 0.25);
        p5.vertex(x, y);
      }
      p5.endShape();
    }
  };
};

const P5Component = () => {
    return <ReactP5Wrapper sketch={sketch} />;
  };
  
  export default P5Component;

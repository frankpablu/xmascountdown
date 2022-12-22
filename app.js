// Countdowm 
const { body } = document;
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

function calculateChristmasCountdown(){
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

//Averigua el año en que ocurrirá la próxima Navidad 
let nextChristmasYear = now.getFullYear();
if (currentMonth === 12 && currentDay > 25){
nextChristmasYear += 1;
}

const nextChistmasDate = (`December 25 ${currentYear} 00:00:00  GMT-5`);
const christmasDate = new Date(nextChistmasDate);
const timeLeft = christmasDate - now;  

let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Don't calculate the time left if it is Christmas day
if (currentMonth !== 12 || (currentMonth === 12 && currentDay !== 25)) {
    days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
    hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
    mins = Math.floor(timeLeft / 1000 / 60) % 60;
    secs = Math.floor(timeLeft / 1000) % 60;
  }
  days.innerHTML = days < 10 ? `0${days}` : days;
  hours.innerHTML = hours < 10 ? `0${hours}` : hours;
  minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
}

setInterval(calculateChristmasCountdown, 1000); 



// Some Snow Falling by Codepen.io
'use strict';

const LIFE_PER_TICK = 1000 / 60;
const MAX_FLAKES = Math.min(75, screen.width / 1280 * 75);
const flakes = [];
const period = [
    n => 5 * (Math.sin(n)),
    n => 8 * (Math.cos(n)),
    n => 5 * (Math.sin(n) * Math.cos(2 * n)),
    n => 2 * (Math.sin(0.25 * n) - Math.cos(0.75 * n) + 1),
    n => 5 * (Math.sin(0.75 * n) + Math.cos(0.25 * n) - 1)
];

const fun = ['⛄', '🎁', '🦌', '☃', '🍪'];

const cssString = `.snowfall-container {
    display: block;
    height: 55vw;
    left: 0;
    margin: 0;
    padding: 0;
    -webkit-perspective-origin: top center;
            perspective-origin: top center;
    -webkit-perspective: 8vw;
            perspective: 8vw;
    pointer-events: none;
    position: fixed;
    top: 0;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    width: 100%;
    z-index: 99999; }

  .snowflake {
    pointer-events: none;
    color: #ddf;
    display: block;
    font-size: 2vw;
    left: -1vw;
    line-height: 2vw;
    position: absolute;
    top: -1vw;
    -webkit-transform-origin: center;
            transform-origin: center; }`;
function ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function resetFlake(flake) {
    let x = flake.dataset.origX = (Math.random() * 100);
    let y = flake.dataset.origY = 0;

    let z = flake.dataset.origZ = (Math.random() < 0.1) ? (Math.ceil(Math.random() * 100) + 25) : 0;

    let life = flake.dataset.life = (Math.ceil(Math.random() * 6000) + 8000); //Milliseconds
    flake.dataset.origLife = life; //Timestamps for flake creation

    flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
    flake.style.opacity = 1.0;

    flake.dataset.periodFunction = Math.floor(Math.random() * period.length);

    if (Math.random() < 0.001) {
        flake.innerText = fun[Math.floor(Math.random() * fun.length)];
    }
}

function updatePositions() {

    flakes.forEach((flake) => {
        let origLife = parseFloat(flake.dataset.origLife)
        let curLife = parseFloat(flake.dataset.life);
        let dt = (origLife - curLife) / origLife;

        if (dt <= 1.0) {
            let p = period[parseInt(flake.dataset.periodFunction)];
            let x = p(dt * 2 * Math.PI) + parseFloat(flake.dataset.origX);
            let y = 100 * dt;
            let z = parseFloat(flake.dataset.origZ);
            flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;

            if (dt >= 0.5) {
                flake.style.opacity = (1.0 - ((dt - 0.5) * 2));
            }

            curLife -= LIFE_PER_TICK;
            flake.dataset.life = curLife;
        }
        else {
            resetFlake(flake);
        }
    });

    window.requestAnimationFrame(updatePositions);
}


function appendSnow() {
    let styles = document.createElement('style');
    styles.innerText = cssString;
    document.querySelector('head').appendChild(styles);

    let field = document.createElement('div');
    field.classList.add('snowfall-container');

    field.setAttribute('aria-hidden', 'true');
    field.setAttribute('role', 'presentation');
    document.body.appendChild(field);

    let i = 0;

    const addFlake = () => {
        let flake = document.createElement('span');
        flake.classList.add('snowflake');
        flake.setAttribute('aria-hidden', 'true');
        flake.setAttribute('role', 'presentation');
        flake.innerText = '❄';
        resetFlake(flake);
        flakes.push(flake);
        field.appendChild(flake);

        if (i++ <= MAX_FLAKES) {
            setTimeout(addFlake, Math.ceil(Math.random() * 300) + 100);
        }
    };
    addFlake();

    updatePositions();
}

ready(appendSnow);

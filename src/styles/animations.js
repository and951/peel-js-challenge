import { keyframes } from '@emotion/core';

const moveLeft = keyframes`
  from {
    transform: translateX(150rem);
  }
  to {
    transform: translateX(0rem);
  }
`
const moveRight = keyframes`
  from {
    transform: translateX(0rem);
  }
  to {
    transform: translateX(150rem);
  }
`

const moveDown = keyframes`
  from {
    transform: translateY(-20rem);
  }
  to {
    transform: translateY(0rem);
  }
`

const fadeIn = keyframes`
 from {
    opacity: 0;
    transform: translateX(1.4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0rem);
  }
`

const fadeOut = keyframes`
 from {
    opacity: 1;
    transform: translateX(1.4rem);
  }
  to {
    opacity: 0;
    transform: translateX(0rem);
  }
`

const rotateIn = keyframes`
 from {
    opacity: 0;
    transform:rotate(180deg);
  }
  to {
    opacity: 1;
    transform:rotate(360deg);
  }
`
const spin = keyframes`
 from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`

const float = keyframes`
    from { transform: translate(0,  0px); }
    65%  { transform: translate(0, 10px); }
    to   { transform: translate(0, 0px); }    
}
`

const appear = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 0.5;
  }
`
const disappear = keyframes`
  from {
    opacity: 0.5
  }
  to {
    opacity: 0;
  }
`
export {
  moveDown, moveLeft, moveRight, appear, float, rotateIn, fadeIn, fadeOut, disappear, spin
}
import { desactivateFloorButton } from './elevator/desactivateFloorButton';
import { setTravelTime } from './elevator/setTravelTime';

import config from './config';

import { Queue, Direction, FloorCalledFrom } from './types';

import { ElevatorInterface } from './interfaces';

const {
  times: { openCloseDoors, waiting }
} = config;

class Elevator implements ElevatorInterface {
  constructor(
      public id: number,
      public currentFloor: number,
      public isMoving: boolean,
      public direction: Direction,
      public queue: Queue,
      public next: boolean | FloorCalledFrom
  ) {}

  startEngine(floorParameters) {
    return runElevator.call(this, floorParameters);
  }

  setNextFloorAndDirection() {
    return setNextFloorAndDirection.call(this);
  }

  setTimeOut: null | Function = null;

  moveElevator(floorParameters) {
    return moveElevator.call(this, floorParameters);
  }

  whenElevatorArrives(floorParameters) {
    return whenElevatorArrives.call(this, floorParameters);
  }
}

function setNextFloorAndDirection(): void {
  const { currentFloor } = this;
  this.next = this.queue[0] || false;
  this.direction = this.next ? (this.next.floor > currentFloor ? 2 : 1) : 0;
}

function whenElevatorArrives(floorParameters) {
  document.querySelectorAll(`[data="${this.id}"]`)[0].style.display = 'none'

  this.currentFloor = this.queue.shift().floor;
  desactivateFloorButton(this.currentFloor, this.next.dir);
  this.setNextFloorAndDirection();
  this.isMoving = false;
  let elevatorElement = document.querySelectorAll(`[data-elevator="${this.id}"]`)[0]
  let floorButtonElement = document.querySelectorAll(`[data-floor-button="${this.currentFloor}"]`)[0]
  document.querySelectorAll(`[data-elevator-sound="${this.id}"]`)[0].play()
  floorButtonElement.innerHTML = "Arrived"
  floorButtonElement.classList.add("arrives")
  elevatorElement.classList.remove("moving")
  elevatorElement.classList.add("arrives")
  setTimeout(()=> {
    elevatorElement.classList.remove("arrives")
    floorButtonElement.classList.remove("arrives")
    floorButtonElement.innerHTML = "Call"

  }, 2000)
  this.startEngine(floorParameters);
}

function moveElevator(floorParameters): void {
  const { id, next, currentFloor, isMoving } = this;
  const elevatorElement = <HTMLElement>document.querySelectorAll(`[data-elevator="${id}"]`)[0];
  elevatorElement.classList.add("moving")
  const nextYPosition = floorParameters[next.floor];
  const travelTime = setTravelTime(isMoving, elevatorElement, nextYPosition, currentFloor, next);
  const travelTimeElement = document.querySelectorAll(`[data="${this.id}"]`)[0]
  travelTimeElement.style.marginTop = `${floorParameters[Object.keys(floorParameters).length] - nextYPosition}px`;
  travelTimeElement.style.display = 'block'
  travelTimeElement.innerHTML = `${travelTime/1000} sec`
  elevatorElement.style.transition = `bottom ${travelTime}ms`;
  elevatorElement.style.transitionTimingFunction = 'linear';
  elevatorElement.style.bottom = `${nextYPosition}px`;
  this.isMoving = true;
  this.setTimeOut = setTimeout(() => {
    this.whenElevatorArrives(floorParameters);
  }, travelTime);
}
function runElevator(floorParameters): void {
  if (this.queue.length) {
    // Waiting...
      // Closing doors...
      setTimeout(() => {
        // Starting travel...
        this.moveElevator(floorParameters);
      }, 2000);

  } else {
    this.direction = 0;
  }
}

export { Elevator };

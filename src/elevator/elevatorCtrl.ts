import { FloorCalledFrom } from '../types';


import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';
import { isAtTheSameFloorFrom } from './isAtTheSameFloorFrom';
import { chooseElevator } from './chooseElevator';

export function onClickElevatorCallButton(ev, building, buildingFloors) {
  const floor: number = Number(ev.target.dataset.floor);
  const dir: number = Number(ev.target.dataset.dir);
  const controlsContainer: HTMLElement = document.querySelector('.controls');
  const queueType: boolean = controlsContainer.dataset.queue === 'true' ? true : false;

  const calledFromFloor: FloorCalledFrom = { floor, dir };
  // Select Elevator to asign floor
  const isCalledAlready: boolean = isAlreadyCalledFrom(calledFromFloor, building.elevators);
  const isAtTheSameFloor: boolean = isAtTheSameFloorFrom(calledFromFloor, building.elevators);

  if (!isCalledAlready && !isAtTheSameFloor) {
    ev.target.classList.add('active');
    ev.target.innerHTML = "Waiting"
    const elevatorId: number = chooseElevator(
      queueType,
      calledFromFloor,
      building.elevators,
      buildingFloors
    );
    // Asign floor to Elevator

    const elevatorQueue = building.elevators[elevatorId].queue;
    building.assignFloorToElevator(elevatorId, calledFromFloor);
    building.elevators[elevatorId].setNextFloorAndDirection();
    if (building.elevators[elevatorId].isMoving === true) {
      building.reAssignElevator(elevatorId);
    }
    // Run Elevator
    if (!elevatorQueue.length) {
      building.elevators[elevatorId].startEngine(building.floorParameters);
    }
  }

  return building.elevators;
}

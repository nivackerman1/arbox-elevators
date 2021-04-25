import _ from 'lodash';
import config from '../config';
import formGroup from './formGroup';

export const resetButton = `
  <div class="reset-bnt-container">
    <button class="reset-button">Do Tama 38</button>
  </div>
`;

function createFloorNumbers(floors: number): string {
  let floorsStructure: string = '';
  for (let i = floors-1; i >= 0; i--) {
    switch(i) {
      case 0:
        floorsStructure += `<div class="number">Ground Floor</div>`;
        break;
      case 1:
        floorsStructure += `<div class="number">1st</div>`;
        break;
      case 2:
        floorsStructure += `<div class="number">2nd</div>`;
        break;
      case 3:
        floorsStructure += `<div class="number">3rd</div>`;
        break;
      default:
        floorsStructure += `<div class="number">${i}th</div>`;
    }
  }
  return floorsStructure;
}

function createFloors(floors: number): string {
  let floorDivider: string = '';
  for (let i = 2; i <= floors; i++) {
    floorDivider += '<div class="floor"></div>';
  }
  return floorDivider;
}

function createElevatorsStructure(elevators: number, floors: number): string {
  let elevatorStructure = '';
  const elevatorLaneHeight = config.building.elevatorLaneHeight(floors);
  const { elevatorWidth, elevatorHeight } = config.building;
  for (let i = 1; i <= elevators; i++) {
    elevatorStructure += `<div class="elevator-lane" style="height:${elevatorLaneHeight}px">
            <p class="travel-time" data="${i}" style="display: none ;margin-left: 5px"></p>

        <div class="elevator" data-elevator="${i}" style="width:${elevatorWidth}px; height:${elevatorHeight}px">
        <audio class ="elevator-sound" data-elevator-sound="${i}"controls style="display: none">
     <source  src="/src/sounds/Elevator-ding-sound-effect.mp3" type="audio/mpeg">
    </audio>

</div>
      </div>`;
  }
  return elevatorStructure;
}

function insertControls(floor: number): string {
  const button = `<div class="floor-button" data-floor-button="${floor}" data-dir="2" data-floor="${floor}">Call</div>`;
  return button
}

function createFloorControl(floors: number): string {
  let controls = '';
  for (let i = floors; i >= 1; i--) {
    controls += `<div class="control-floor">${insertControls(i)}</div>`;
  }
  return controls;
}

export const form: string = `<section class="settings">
  <form class="initial-setting-form">
    ${formGroup('How many Floors?', 'floors', 10, 4, 80, 'Type a number', 'This field is required!')}
    ${formGroup(
    'How many elevators?',
    'elevators',
    5,
    1,
    10,
    'Type a number',
    'This field is required!'
)}
        <input type="checkbox" value="true" style="display: none" id="queue-check" checked onClick="(()=>{this.value = !this.value})()">
         <div class="form-group button-cont">
      <button class="create-building">Build it!</button>
    </div>
  </form>
</section>`;

export const systemStructure = `<section class="system-container">
    <section class="columns-cont">
      </section>
      <section class="building-area">
      </section>
    </section>
  </section>`;

export function buildingStructure(floors: number, elevators: number, queueType): string {
  return `<div class="building-container">
      <div class="floor-numbers">
        ${createFloorNumbers(floors)}
      </div>
      <div class="building">
        <div class="floors" style="bottom:44px; top:44px;">
          ${createFloors(floors)}
        </div>
        <div class="elevators-cont">
          ${createElevatorsStructure(elevators, floors)}
        </div>
      </div>
      <div class="controls" data-queue="${queueType}">
        ${createFloorControl(floors)}
      </div>
    </div>`;
}


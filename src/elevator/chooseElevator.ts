import * as _ from 'lodash';

import { ChooseElevator, FloorCalledFrom } from '../types';

import { Elevator } from '../elevatorModel';
import { Elevators } from '../types';

export const chooseElevator: ChooseElevator = (
    distributed: boolean,
    floorCall: FloorCalledFrom,
    elevators: Elevators,
): number => {
    const stoppedElevators = {};
    _.forEach(elevators, (el: Elevator, key) => {
        if (el.direction === 0) {
            stoppedElevators[key] = el;
        }
    });

    elevators = !_.isEmpty(stoppedElevators) ? stoppedElevators : elevators;

    let chosenElevator;
    let distance = 0;
    _.forEach(elevators, (elevator: Elevator, key) => {
        const { currentFloor} = elevator;
        const id = key;
        distance = Math.abs(floorCall.floor - currentFloor);
        const tempElevator = { id, distance };
        if (_.isEmpty(chosenElevator)) {
            chosenElevator = tempElevator;
        } else {
            chosenElevator = chosenElevator.distance > distance ? tempElevator : chosenElevator;
        }
    });

    return Number(chosenElevator.id);
};

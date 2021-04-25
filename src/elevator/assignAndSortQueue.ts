export function assignAndSortQueue(calledFrom, currentFloor, elevatorDir, currentQueue) {
  const { dir, floor } = calledFrom;
  let finalQueue = [...currentQueue];

  finalQueue.push(calledFrom);
  if (finalQueue.length > 1) {
    let nextFloorOppositeDir = finalQueue.filter((el) => {
      return el.dir !== elevatorDir;
    });
      let nextFloorsGoingUp = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor > currentFloor;
      });
      nextFloorsGoingUp = nextFloorsGoingUp.sort((a, b) => a.floor - b.floor);

      nextFloorOppositeDir = nextFloorOppositeDir.sort((a, b) => b.floor - a.floor);

      let lastestFloorsGoingUp = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor <= currentFloor;
      });
      lastestFloorsGoingUp = lastestFloorsGoingUp.sort((a, b) => a.floor - b.floor);

      finalQueue = [...nextFloorsGoingUp, ...nextFloorOppositeDir, ...lastestFloorsGoingUp];

  }
  return finalQueue;
}

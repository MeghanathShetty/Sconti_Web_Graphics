const isTooClose = (positions, newX, newY, newZ, radius) => {
  return positions.some(([existingX, existingY, existingZ]) => {
    const distance = Math.sqrt(
      Math.pow(existingX - newX, 2) + 
      Math.pow(existingY - newY, 2) + 
      Math.pow(existingZ - newZ, 2)
    );
    return distance < radius;
  });
};

export const createRandomPositions=(boundary = 4.8, count = 3, positions = [], addOneMore = false, Y = 0, radius = 0) => {
  if (addOneMore) count = 1; // extra validation
  for (let i = 0; i < count; i++) {
    while (true) {
      let newX = Math.random() * (boundary - (-boundary)) + (-boundary);
      let newZ = Math.random() * (boundary - (-boundary)) + (-boundary);
      let newY=Y;

      if (!isTooClose(positions, newX, newY, newZ, radius)) {
        positions.push([newX, newY, newZ]);
        break;
      }
    }
  }

  return addOneMore ? positions[positions.length - 1] : positions;
}
export const createLinearPositions = (
  boundary = 4.8,
  count = 3,
  positions = [],
  addOneMore = false,
  gapX = 0.8,
  gapY = 0.8
) => {
  let minBound = -(boundary);
  let maxBound = boundary;

  let newX = maxBound;
  let newY = 0;
  let newZ = maxBound;

  let placedCount = 0; // Track placed positions

  if (positions.length !== 0) {
    let prevLastPosition = positions[positions.length - 1];
    newX = prevLastPosition[0];
    newY = prevLastPosition[1];
    newZ = prevLastPosition[2];

    if (newX > minBound) {
      newX -= gapX;
    } else {
      newZ -= gapY;
      newX = maxBound;
    }

    if(addOneMore) {
      if(newX < minBound || newZ < minBound) { // will only be used when addMore is true
        return null; // exit and send null
      }
    }
  }

  if (addOneMore) count = 1; // extra validation
  while (placedCount < count && newX >= minBound && newZ >= minBound) {
    positions.push([newX, newY, newZ]);
    placedCount++;

    if(!addOneMore) { // not mandatory if condition
      if (newX > minBound) {
        newX -= gapX;
      } else {
        newZ -= gapY;
        newX = maxBound;
      }
    }
  }

  return addOneMore ? positions[positions.length - 1] : positions;
};

export const getRandomValues = (min, max, count) => {
  let values = [];
  for (let i = 0; i < count; i++) {
    values.push(Math.random() * (max - min) + min);
  }
  return values;
}
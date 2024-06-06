const isTooClose = (positions, newX, newY, newZ, radius, ignoreYIsClose) => {
  if(ignoreYIsClose) {
    return positions.some(([existingX, existingY, existingZ]) => {
      const distance = Math.sqrt(
        Math.pow(existingX - newX, 2) + 
        Math.pow(existingZ - newZ, 2)
      );
      return distance < radius;
    });
  } else {
    return positions.some(([existingX, existingY, existingZ]) => {
      const distance = Math.sqrt(
        Math.pow(existingX - newX, 2) + 
        Math.pow(existingY - newY, 2) + 
        Math.pow(existingZ - newZ, 2)
      );
      return distance < radius;
    });
  }
};

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
      return false;
  }
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
      }
  }
  return true;
}

export const createRandomPositions=(boundary = 4.8, count = 3,
  positions = [], addOneMore = false,
  Y = 0, radius = 0, ignoreYIsClose = false, maxAttempt = 30) => {

  let oldPositions = [...positions];

  if (addOneMore) count = 1; // extra validation
  for (let i = 0; i < count; i++) {
    while (true) {
      let newX = Math.random() * (boundary - (-boundary)) + (-boundary);
      let newZ = Math.random() * (boundary - (-boundary)) + (-boundary);
      let newY=Y;

      if (!isTooClose(positions, newX, newY, newZ, radius, ignoreYIsClose)) {
        positions.push([newX, newY, newZ]);
        break;
      }

      if(maxAttempt<0) {
        console.log("No more positions left");
        break;
      }
      maxAttempt--;
    }
  }

  if(arraysAreEqual(oldPositions,positions)) {
    return null;
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

export const createLinearPositionsYAxis = (boundary = 1,
   count = 3, 
   positions = [], 
   addOneMore = false,
   gapY = 0.056,
   radius = 0.35,
   minStack = 4,
   stackSize = 10,
   fixedStackSize = false,
   x = 1,
   y = 1.94,
   z = 0) => {

  let stack = 0;
  let tempStackSize = stackSize;
  let newX = x;
  let newY = y;
  let newZ = z;
  let XZList = [];

  if (addOneMore) {
    let prevLastPosition;
    if(positions.length !== 0) {
      prevLastPosition = positions[positions.length - 1];
      newX = prevLastPosition[0];
      newY = prevLastPosition[1];
      newZ = prevLastPosition[2];
    }

    let tempStackSize;
    if(!fixedStackSize)  
      tempStackSize = Math.random() * (stackSize - minStack) + stackSize;
    else
      tempStackSize = stackSize;

    if(newY > ((gapY * tempStackSize)+y)) {
      let xt;
      let zt;
      newY = y;
      while(true) {
        xt = Math.random() * (boundary - (-boundary)) + (-boundary);
        zt = Math.random() * (boundary - (-boundary)) + (-boundary);
        if (!isTooClose(positions, xt, newY, zt, radius)) {
          XZList.push([xt, zt]);
          break;
        }
      }
      XZList.push([xt,zt]);
      newX = xt;
      newZ = zt;
    } else {
      newY += gapY;
    }
    positions.push([newX, newY, newZ]);
  }

  if(addOneMore) return positions[positions.length - 1];

  for (let i = 0; i < count; i++) {

    if(stack >= tempStackSize) {
      if(!fixedStackSize) {
        tempStackSize = Math.random() * (stackSize - minStack) + stackSize;
      }
      let xt;
      let zt;
      while(true) {
        newY = y;
        xt = Math.random() * (boundary - (-boundary)) + (-boundary);
        zt = Math.random() * (boundary - (-boundary)) + (-boundary);
        if (!isTooClose(positions, xt, newY, zt, radius)) {
          XZList.push([xt, zt]);
          break;
        }
      }
      XZList.push([xt,zt]);
      newX = xt;
      newZ = zt;
      stack = 0;
      positions.push([newX, newY, newZ]);
    } else {
      positions.push([newX, newY, newZ]);
      newY += gapY
      stack += 1;
    }
  }

  return positions;
}
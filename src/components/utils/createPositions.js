
export const createPositions=(boundary = 4.8, count = 3, positions = [], sapling = false) =>{

    // let positions = [];

    for (let i = 0; i < count; i++) {
      while (true) {
        let newX = Math.random() * (boundary - (-boundary)) + (-boundary);
        let newZ = Math.random() * (boundary - (-boundary)) + (-boundary);
        let newY=0;
  
        // Check if the new position is already there
        let positionExists = positions.some(([existingX, existingY, existingZ]) => {
          return existingX === newX && existingY === newY && existingZ === newZ;
        });
  
        if (!positionExists) {
          positions.push([newX, newY, newZ]);
          break;
        }
      }
    }
  
    if(sapling){
      return positions[positions.length -1];
    }else{
      return positions;
    }
}
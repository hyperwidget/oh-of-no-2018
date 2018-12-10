import { cloneDeep } from "lodash";

export default {
  a: inputs => {
    const points = [];
    inputs.forEach(input => {
      const splitted = input
        .replace("position=<", "")
        .replace("velocity=", "")
        .split("> ");
      const position = splitted[0].split(", ");
      const velocity = splitted[1]
        .replace("<", "")
        .replace(">", "")
        .split(", ");

      const point = {
        startingPosition: [parseInt(position[0]), parseInt(position[1])],
        position: [parseInt(position[0]), parseInt(position[1])],
        velocity: [parseInt(velocity[0]), parseInt(velocity[1])]
      };
      points.push(point);
    });

    let isGrowing = false;
    let lastLength = 999999;
    let lastPoints = [];
    let count = 0;

    while (!isGrowing) {
      const lowestX = points.reduce(
        (lowest, point) =>
          point.position[0] < lowest ? point.position[0] : lowest,
        0
      );
      const highestX = points.reduce(
        (highest, point) =>
          point.position[0] > highest ? point.position[0] : highest,
        0
      );
      const lowestY = points.reduce(
        (lowest, point) =>
          point.position[1] < lowest ? point.position[1] : lowest,
        0
      );
      const highestY = points.reduce(
        (highest, point) =>
          point.position[1] > highest ? point.position[1] : highest,
        0
      );

      const gridXSize = highestX;
      const gridYSize = highestY;

      if (gridYSize === 10) {
        isGrowing = true;
        const grid = Array(gridXSize + 1).fill([]);
        for (let i = 0; i < grid.length; i++) {
          grid[i] = Array(gridYSize).fill(".");
        }

        lastPoints.forEach(point => {
          let x = 0;
          let y = 0;

          x = point.position[0] + (0 - lowestX);
          y = point.position[1] + (0 - lowestY);

          // console.log(point.position[0], point.position[1])
          // console.log(x, y)
          grid[y][x] = "x";
        });
        console.table(grid);
      }

      if (gridYSize > lastLength) {
        isGrowing = true;
        let grid = Array(gridXSize + 1).fill([]);

        // console.log(gridYSize);
        // console.log(gridXSize);
        // grid = Array(gridYSize).fill([]);
        // for (let i = 0; i < grid.length; i++) {
        //   grid[i] = Array(gridXSize).fill(" ");
        // }

        // lastPoints.forEach(point => {
        //   let x = 0;
        //   let y = 0;

        //   x = point.position[0];
        //   y = point.position[1];

        //   if (x === 2 && y === 1) {
        //     console.log(point);
        //   }

        //   // console.log(point.position[0], point.position[1])
        //   // console.log(x, y)
        //   grid[y][x] = "x";
        // });
        // console.table(grid);
      } else {
        lastLength = gridYSize;
        lastPoints = cloneDeep(points);
      }

      // if (!lastLength || grid[0].length < lastLength) {
      //   console.log(lastLength)
      //   lastLength = grid[0].length
      // } else {
      //   console.log('exit')
      //   console.log(grid[0].length)
      //   isGrowing = true
      // }
      // console.table(grid)

      points.forEach(point => {
        point.position[0] += point.velocity[0];
        point.position[1] += point.velocity[1];
      });
      count++;
    }

    console.log(count - 2);
    return 0;
  },
  b: input => {
    return input;
  }
};

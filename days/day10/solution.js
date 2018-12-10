import { cloneDeep } from "lodash";

export const process = inputs => {
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
  let grid = [];

  while (!isGrowing) {
    const lowestX = points.reduce(
      (lowest, point) =>
        point.position[0] < lowest ? point.position[0] : lowest,
      99999
    );
    const highestX = points.reduce(
      (highest, point) =>
        point.position[0] > highest ? point.position[0] : highest,
      0
    );
    const lowestY = points.reduce(
      (lowest, point) =>
        point.position[1] < lowest ? point.position[1] : lowest,
      99999
    );
    const highestY = points.reduce(
      (highest, point) =>
        point.position[1] > highest ? point.position[1] : highest,
      0
    );

    const gridXSize = highestX - lowestX;
    const gridYSize = highestY - lowestY;

    if (gridYSize > lastLength) {
      isGrowing = true;
      grid = Array(gridXSize + 1).fill([]);

      grid = Array(gridYSize).fill([]);
      for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(gridXSize).fill(" ");
      }

      lastPoints.forEach(point => {
        let x = 0;
        let y = 0;

        x = point.position[0] - lowestX;
        y = point.position[1] - lowestY;

        grid[y][x] = "x";
      });
    } else {
      lastLength = gridYSize;
      lastPoints = cloneDeep(points);
    }

    points.forEach(point => {
      point.position[0] += point.velocity[0];
      point.position[1] += point.velocity[1];
    });
    count++;
  }

  console.table(grid);
  return count - 2;
};

export default {
  a: process,
  b: process
};

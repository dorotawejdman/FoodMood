import { Position } from "../models/Position";

export const calculateDistance = (objectA: Position, objectB: Position) => {
  return Math.sqrt((objectA.x - objectB.x) ** 2 + (objectA.y - objectB.y) ** 2);
};

export const getRandomNumber = (range: number): number => {
  return Math.floor(Math.random() * range);
};

export const getRandomXPosition = (range: number): number => {
  if (range > window.innerWidth) {
    range = window.innerWidth;
  }
  const margin = (window.innerWidth - range) / 2;
  return margin + Math.random() * range;
};

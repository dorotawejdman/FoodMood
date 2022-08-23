import { Position } from "../models/Position";

export const calculateDistance = (objectA: Position, objectB: Position): number => {
  if (objectA == null || objectB == null) return null;
  return Math.sqrt((objectA.x - objectB.x) ** 2 + (objectA.y - objectB.y) ** 2);
};

export const getRandomNumber = (range: number): number => {
  if (range == null) return 0;
  return Math.floor(Math.random() * range);
};

export const getRandomXPosition = (range: number): number => {
  if (range == null) return 0;
  if (range < 0) return 0;
  if (range > window.innerWidth) {
    range = window.innerWidth;
  }
  const margin = (window.innerWidth - range) / 2;
  return margin + Math.random() * range;
};


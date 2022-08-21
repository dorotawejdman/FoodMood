import { Position } from "./models/Position";
import { TextStyle, Text } from "pixi.js";

export const calculateDistance = (objectA: Position, objectB: Position) => {
  return Math.sqrt((objectA.x - objectB.x) ** 2 + (objectA.y - objectB.y) ** 2);
};

export const createText = (content: string = "", fontSize: number = 45, x: number = window.innerWidth / 2, y: number = 10): Text => {
  const style = new TextStyle({
    fontFamily: "Montserrat",
    fontSize: fontSize,
    fill: 0xdddddd,
    align: "center",
  });
  const text = new Text(content, style);
  text.anchor.x = 0.5;
  text.position.x = x;
  text.position.y = y;
  return text;
};

export const getRandomNumber = (range: number): number => {
  return Math.floor(Math.random() * range);
};

export const getRandomXPosition = (width: number): number => {
  const margin = (window.innerWidth - width) / 2;
  return margin + Math.random() * width;
};

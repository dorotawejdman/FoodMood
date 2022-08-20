import { TextStyle, Text } from "pixi.js";

export const calculateDistance = (objectA: number, objectB: number) => {
  return objectA - objectB;
};

export const addTitle = (): Text => {
  const style = new TextStyle({
    fontFamily: "Montserrat",
    fontSize: 45,
    fill: 0xdddddd,
    align: "center",
  });
  const text = new Text("FOOD MOOD", style);
  text.anchor.x = 0.5;
  text.position.x = window.innerWidth / 2;
  text.position.y = 10;
  return text;
};

export const getRandomNumber = (range: number): number => {
  return Math.floor(Math.random() * range);
};

export const getRandomXPosition = (width: number): number => {
  const margin = (window.innerWidth - width) / 2;
  return margin + Math.random() * width;
};

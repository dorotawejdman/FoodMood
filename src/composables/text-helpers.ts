import { TextStyle, Text } from "pixi.js";

export const createText = (content: string = "", fontSize: number = 45, x: number = window.innerWidth / 2, y: number = 10): Text => {
  const style = new TextStyle({
    fontFamily: "Montserrat",
    fontSize: fontSize,
    fill: 0xdddddd,
  });
  const text = new Text(content, style);
  text.anchor.x = 1;
  text.position.x = x;
  text.position.y = y;
  return text;
};

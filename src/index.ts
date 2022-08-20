import { AppManager } from "./App";
import { addTitle } from "./helpers";

const app = new AppManager();

const text = addTitle();
app.app.stage.addChild(text);

import { initializeSwarm } from "../components/SwarmComponent";
import { getSwarm } from "./StorageService";

export function initializeGame() {
  //Load din localstorage
  // loadGame()
  initializeSwarm();
  console.log('!!testsd');
}

export function loadGame() {
  getSwarm();
}
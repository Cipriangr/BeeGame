# Bee Swarm Game

This project is a simple interactive game where a player can hit bees in a swarm and track their health

## Install Project Locally

1. Clone the repository:
  `git clone https://github.com/Cipriangr/BeeGame.git`


2. Navigate to the project folder and install dependencies:
  `npm install`


## Starting the project
  `npm run start`
  Navigate to http://localhost:3000/ in your browser. The application will automatically reload if you modify source files.

## Building the Project
  `npm run build`
  The build artifacts will be stored in the dist/ directory.

## Running Unit Tests
  Unit tests are configured with Karma and Jasmine. To execute the tests, run: `npm run test`
  To generate a coverage report, use: `npm run test:coverage`

## Game Overview
  The bee swarm in this game consists of three types of bees:

  -Queen: 1 bee with 100 HP
  -Worker: 5 bees, each with 75 HP
  -Drone: 8 bees, each with 50 HP
  Gameplay
  1. Objective: Use the "Hit" button to randomly inflict damage on a bee in the swarm.
  2. Damage:
      Queen: 8 damage
      Worker: 10 damage
      Drone: 12 damage
  3. Bee Status:
      When a bee’s HP reaches 0, it dies.
      If the Queen’s HP reaches 0, all bees die.
  4. Game Interface:
      Displays the player’s name.
      Shows all alive bees, grouped by type, along with detailed health information for each bee.
      Indicates which bee type was hit and the damage inflicted on each click.
  5. End Game Conditions:
      When all bees are dead.
      When the Queen’s HP reaches 0.
  6. Restart: The game can reset to its initial state after reaching “game over.”
  7. Persistence: The game state is saved between sessions, allowing players to continue from where they left off.

## Improvements to be made
  App.ts is not tested yet. I had some big issues with unit tests where I encountered errors like: "TypeError: Descriptor for property saveGameStatus is non-configurable and non-writable". In JavaScript (and TypeScript), when you import functions from modules, those imports are read-only bindings and since I used many imports to make the app more alike angular, I encountered this problem in almost every unit test file. So I found the solution to add dependency injection for testability, enabling mock/stub injection to isolate functions in unit tests and avoid issues with non-writable imports.
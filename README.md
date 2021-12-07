# Solutions of Advent of Code 2021 problems.

### JavaScript solutions by Melis Alibi. 1st of December 2021.

### Info <hr>
Advent of Code is an annual set of Christmas-themed computer programming challenges that follow an Advent calendar. It has been running since 2015. The programming puzzles cover a variety of skill sets and skill levels can be solved using any programming language.

### My Solutions <hr>
I used JavaScript (Node.js) to solve the puzzles of this event. I also created a number of scripts to learn to automate some of the repetitive tasks. They are:
- npm run new-day
	- Creates a new folder taking today's date in a format of dd-Mmm-yyyy as a name.
	- Creates a new template .js file with all initially needed code in a corresponding folder and names it 'part1.js'.
	- Creates an 'input.txt' file for given input.
- npm run part-one-solved:
	- The solution of Part 2 is closely related to the solution of Part 1. It is rather an enhancement of Part 1. In order to have both of the solution, without still having to copy-paste the code, this script copies the Part 1 solution into a new file calling it 'part2.js'.
	- Commits the solution of Part 1 with a message 'Part 1 Solved'.
- npm run solved --message=your_message:
	- Commits final solutions to git with your_message
	- Pushes the solutions to the remote head branch on GitHub.


$(document).ready(function(){
  console.log("JQuery has loaded");

  // the scheduler interval ID generated when ghostProtocol is started. Used to stop ghostProtocol
  var gp;
  // references of the different entities in the board
  var EMP = 0; // empty
  var COI = 1; // dots
  var PAC = 2; // pac-man
  var CHR = 3; // cherries
  var GHS = 4; // ghost
  var LDT = 5; // Large Dot
  // horizontal and vertical maze walls
  var VER = 10;
  var HOR = 11;
  // outside corners
  var TLC = 12;
  var TRC = 13;
  var BRC = 14;
  var BLC = 15;
  // T intersections
  var TUP = 16;
  var TDN = 17;
  var TLF = 18;
  var TRT = 19;
  // ends of lines
  var BOT = 20;
  var TOP = 21;
  var LFT = 22;
  var RGT = 23;

  var classes = [  // array of class names in css
    'empty',    // empty class 0
    'coin',     // coin class 1
    'pacman',   // pacman tbd 2
    'cherry',   // cherry 3
    'ghost',    // ghost tbd 4
    'blinkDot', // eat the Ghosts dot 5
    '',         // not used 6
    '',         // not used 7
    '',         // not used 8
    '',         // not used 9
    'vert',     // vertical wall 10
    'horz',     // horizontal wall 11
    'tlc',     // 12 -15 corners
    'trc',     //
    'brc',     //
    'blc',     //
    'tup',     // 16 -19 T interesections
    'tdn',     //
    'tlf',     //
    'trt',     //
    'bot',     // 20 -23 ends of walls
    'top',     //
    'lft',     //
    'rgt'     //
  ]
  // 41 x 53 grid
  var gameBoardGrid = [
  //                                        1                                       2                                       3                                       4
  // 0  1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0
  [TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TUP,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC], // 0
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 1
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 2
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 3
  [VER,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,VER,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,VER], // 4
  [VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER], // 5
  [VER,EMP,LDT,EMP,VER,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,VER,EMP,LDT,EMP,VER], // 6
  [VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER], // 7
  [VER,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,BOT,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,VER], // 8
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 9
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 10
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 1
  [VER,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,TOP,EMP,COI,EMP,TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC,EMP,COI,EMP,TOP,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRC,EMP,COI,EMP,VER], // 2
  [VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER], // 3
  [VER,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,VER,EMP,COI,EMP,BLC,HOR,HOR,HOR,TUP,HOR,HOR,HOR,BRC,EMP,COI,EMP,VER,EMP,COI,EMP,BLC,HOR,HOR,HOR,BRC,EMP,COI,EMP,VER], // 4
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 5
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 6
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 7
  [BLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC,EMP,COI,EMP,TLF,HOR,HOR,HOR,RGT,EMP,EMP,EMP,BOT,EMP,EMP,EMP,LFT,HOR,HOR,HOR,TRT,EMP,COI,EMP,TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,BRC], // 8
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 9
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 20
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 1
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,TLC,HOR,RGT,EMP,EMP,EMP,LFT,HOR,TRC,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 2
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 3
  [LFT,HOR,HOR,HOR,HOR,HOR,HOR,HOR,BRC,EMP,COI,EMP,BOT,EMP,EMP,EMP,VER,EMP,GHS,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,BOT,EMP,COI,EMP,BLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,RGT], // 4
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 5
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,COI,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,COI,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 6
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 7
  [LFT,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC,EMP,COI,EMP,TOP,EMP,EMP,EMP,BLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,BRC,EMP,EMP,EMP,TOP,EMP,COI,EMP,TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,RGT], // 8
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 9
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 30
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 1
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC,EMP,EMP,EMP,VER,EMP,COI,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 2
  [EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP], // 3
  [TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,BRC,EMP,COI,EMP,BOT,EMP,EMP,EMP,BLC,HOR,HOR,HOR,TUP,HOR,HOR,HOR,BRC,EMP,EMP,EMP,BOT,EMP,COI,EMP,BLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC], // 4
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 5
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 6
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 7
  [VER,EMP,COI,EMP,LFT,HOR,HOR,HOR,TRC,EMP,COI,EMP,LFT,HOR,HOR,HOR,RGT,EMP,COI,EMP,BOT,EMP,COI,EMP,LFT,HOR,HOR,HOR,RGT,EMP,COI,EMP,TLC,HOR,HOR,HOR,RGT,EMP,COI,EMP,VER], // 8
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 9
  [VER,EMP,LDT,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,PAC,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,LDT,EMP,VER], // 40 (start row for pac-man)
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 1
  [TLF,HOR,HOR,HOR,TRC,EMP,COI,EMP,VER,EMP,COI,EMP,TOP,EMP,COI,EMP,TLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TRC,EMP,COI,EMP,TOP,EMP,COI,EMP,VER,EMP,COI,EMP,TLC,HOR,HOR,HOR,TRT], // 2
  [VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER,EMP,EMP,EMP,VER], // 3
  [TLF,HOR,HOR,HOR,BRC,EMP,COI,EMP,BOT,EMP,COI,EMP,VER,EMP,COI,EMP,BLC,HOR,HOR,HOR,TUP,HOR,HOR,HOR,BRC,EMP,COI,EMP,VER,EMP,COI,EMP,BOT,EMP,COI,EMP,BLC,HOR,HOR,HOR,TRT], // 4
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 5
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 6
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 7
  [VER,EMP,COI,EMP,LFT,HOR,HOR,HOR,HOR,HOR,HOR,HOR,TDN,HOR,HOR,HOR,RGT,EMP,COI,EMP,BOT,EMP,COI,EMP,LFT,HOR,HOR,HOR,TDN,HOR,HOR,HOR,HOR,HOR,HOR,HOR,RGT,EMP,COI,EMP,VER], // 8
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 9
  [VER,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,COI,EMP,VER], // 50
  [VER,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,EMP,VER], // 1
  [BLC,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,HOR,BRC], // 2
  ];

  // will hold the current position of pacman
  var pacman = {
    x: 20,
    y: 40,
    last_x: 20,
    last_y: 40,
    direction: 'right',
    image: 'pacman.gif'
  }

  // will hold the total number of coins. start with 1 to account for the coin under Pac-Man
  var coins = 0;
  // direction of pacman to orient the image
  var dir   = 0;
  // will hold the current position of the ghost.
  var ghost = {
    x: 18,
    y: 25
  }
  // previous direction of movement of ghost (left, right, up, down)
  var prevGhostStep = '';
  // original content of the cell occupied by the ghost
  var ghostCellContent = EMP;
  // scorecard
  var score = 0;
  // draw the board so we can find the characters
  drawGameBoard();
  // execute the routine to find the initial locations of characters
  findEm();
  // flag to represent if pacman is alive or not
  var alive = true;
  var gameOver = false;
  //
  startGhost();
  //
  // if (!alive){return}; // Added this so that after game over keyPress is not processed
  if (alive && !gameOver) {
    $(document).keydown(function(key) {
      function moveLeft() {
        pacman.image = 'pacmanL.gif';
        // check for 3 open array spots 2 positions to the left at y-1,y,and y+1
        if ((gameBoardGrid[pacman.y][pacman.x-2]>9) ||
            (gameBoardGrid[pacman.y-1][pacman.x-2]>9) ||
            (gameBoardGrid[pacman.y+1][pacman.x-2]>9)) {
          return(pacman.x);  // Cannot move further left: walls
        }
        else {
          pacman.direction = 'left';
          if (pacman.x == 0) {
            return(40);
          }
          else {
            return(pacman.x-1);
          }
        }
      } //fn moveLeft()
      function moveRight() {
        pacman.image='pacmanR.gif';
        // check for 3 open array spots 2 positions to the right at y-1,y,and y+1
        if ((gameBoardGrid[pacman.y][pacman.x+2]>9) ||
            (gameBoardGrid[pacman.y-1][pacman.x+2]>9) ||
            (gameBoardGrid[pacman.y+1][pacman.x+2]>9)) {
          return(pacman.x);  // Cannot move further left: walls
        }
        else {
          pacman.direction = 'right';
          if (pacman.x == 40) {
            return(0);
          }
          else {
            return(pacman.x+1);
          }
        }
      } //fn moveLeft()
      function moveUp() {
        // check for 3 open array spots 2 positions to the above at y-1,y,and y+1
        if ((gameBoardGrid[pacman.y-2][pacman.x]>9) ||
            (gameBoardGrid[pacman.y-2][pacman.x-1]>9) ||
            (gameBoardGrid[pacman.y-2][pacman.x+1]>9)) {
          return(pacman.y);  // Cannot move further left: walls
        }
        else {
          pacman.direction = 'up';
          pacman.image='pacmanU.gif';
          return(pacman.y-1);
        }
      } //fn moveUp()
      function moveDown() {
        // check for 3 open array spots 2 positions to the lower at y-1,y,and y+1
        if ((gameBoardGrid[pacman.y+2][pacman.x]>9) ||
            (gameBoardGrid[pacman.y+2][pacman.x-1]>9) ||
            (gameBoardGrid[pacman.y+2][pacman.x+1]>9)) {
          return(pacman.y);  // Cannot move further left: walls
        }
        else {
          pacman.direction = 'down';
          pacman.image='pacmanD.gif';
          return(pacman.y+1);
        }
      } //fn moveDown()
      pacman.last_x = pacman.x;
      pacman.last_y = pacman.y;
      console.log("key press?"+key.which)
      switch(key.which){
        case 37:
          pacman.x = moveLeft();
          dir = 37;
          break;
        case 38:
          pacman.y = moveUp();
          dir = 38;
          break;
        case 39:
          pacman.x = moveRight();
          dir = 39;
          break;
        case 40:
          pacman.y = moveDown();
          dir = 40;
          break;
        default:
          // uncomment the alert and comment out the console.log if that logging is not desired
          // comment out both alert and console.log if no message has to be sent to the user
          console.log(key.which)
          // alert('Invalid key. Please use Arrow keys');
          console.log('Invalid keys pressed.');
          return;
      }
      // if (gameBoardGrid[pacman.y][pacman.x] <= 10 ){  // the outer IF is for collison detection
        if (gameBoardGrid[pacman.y][pacman.x] == COI){  // the inner IF is for scoring
          score = score + 10;
          coins--;
        }
        if (coins == 0) {
          gameOver= true;
        }
        gameBoardGrid[pacman.y][pacman.x] = PAC;

        if (pacman.x !== pacman.last_x || pacman.y !== pacman.last_y){
          gameBoardGrid[pacman.last_y][pacman.last_x] = EMP;
          pacman.last_x = pacman.x;
          pacman.last_y = pacman.y;
        }
      // }
      drawGameBoard();
    })
  }
  //
  // Draw the Game Screen
  //
  function drawGameBoard(){
        //
        // Format a Row from the Array into an HTMLstring
        //
        function fetchRowCells(row){
          var oneRowHTML = [];

          for (var cellIdx = 0; cellIdx < row.length; cellIdx++){
            var className;
            className = classes[row[cellIdx]];

              if (row[cellIdx] == PAC || row[cellIdx] == GHS || row[cellIdx] == CHR) {
                //do something different to draw big characters
                switch (row[cellIdx]) {
                  case (PAC):
                    var imageFile = pacman.image;
                    var pacManDiv = '<div class="char">'+'<img src="./images/'+ imageFile +'"height="30" width="30"/></div>'
                    oneRowHTML.push(pacManDiv);
                    break;
                  case (GHS):
                    var imageFile = 'inky_ghost2.gif';
                    var ghostDiv = '<div class="char">'+'<img src="./images/'+ imageFile +'"height="30" width="30"/></div>'
                    oneRowHTML.push(ghostDiv);
                    break;
                  default:
                    //unknown character, let's assume it is a background image cell...
                  divCode = '<div class="'+className+'"></div>'
                  oneRowHTML.push(divCode);
                }
              }
              else {
                divCode = '<div class="'+className+'"></div>'
                oneRowHTML.push(divCode);
              }
          }
          oneRowHTML=oneRowHTML.join("");
          return oneRowHTML;
        }
    //
    //  If Pac-Man is not still playing, then don't continue
    //  re-drawing the screen...
    //
    //if (!alive){return}; // Added this so that after game over we dont want any redrawing of the board
      if ((ghost.x == pacman.x) && (ghost.y == pacman.y)){
        alive = false;
        clearInterval(gp);
      }


    // Clear our array of the contents of the screen before writing it back out
    // of the 2-D array
    var htmlElements = [];
    // read the whole 2-D array and write into the DOM
    for (var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx++){
      var rowDivHTML = "<div class='row'>"+fetchRowCells(gameBoardGrid[rowIdx])+'</div>';
      htmlElements.push(rowDivHTML);
    }
    htmlElements = htmlElements.join("");
    // write the whole screen into the html
    $('.game-board').html(htmlElements);

    // Adding the scorecard
    $('.score').html($('<ul />',{
      html: $('<li />',{
        text: "Score"
      }),
      append: $('<li />',{
        text: score
      })
    }))

    // showing the game over message
    if (!alive || coins == 0){
      gameOver = true;
      $('.score ul').append($('<li />',{
        text: "Game Over"
      }))
    }
  }

  function startGhost(){
    gp = setInterval(ghostProtocol, 300); // change the number here to speed up or slow down the ghost

    // The below is for testing. The ghost moves on hitting the space bar. if this is uncommented, make sure the setInterval statement is commented. Otherwise, it will still work but wont be of help with testing.

    // $(document).keydown(function(e){
    //   if (event.which == 32){
    //     ghostProtocol();
    //   }
    // })
  }

  function ghostProtocol(){
    // addKeyPressListener();
    var    dirAvail = [];
    var     dirToGo = [];
    var    dirMatch = 0;
    var matchedDirs = [];

    if (gameBoardGrid[ghost.y][ghost.x - 2]   < 10 &&
        gameBoardGrid[ghost.y-1][ghost.x - 2] < 10 &&
        gameBoardGrid[ghost.y+1][ghost.x - 2] < 10) {
          dirAvail.push('l')
    };
    if (gameBoardGrid[ghost.y][ghost.x + 2]   < 10 &&
        gameBoardGrid[ghost.y-1][ghost.x + 2] < 10 &&
        gameBoardGrid[ghost.y+1][ghost.x + 2] < 10){
          dirAvail.push('r')
    };
    if (gameBoardGrid[ghost.y - 2][ghost.x]   < 10 &&
        gameBoardGrid[ghost.y - 2][ghost.x-1] < 10 &&
        gameBoardGrid[ghost.y - 2][ghost.x+1] < 10) {
          dirAvail.push('u')
    };
    if (gameBoardGrid[ghost.y + 2][ghost.x]   < 10 &&
        gameBoardGrid[ghost.y + 2][ghost.x-1] < 10 &&
        gameBoardGrid[ghost.y + 2][ghost.x+1] < 10) {
          dirAvail.push('d')
    };

    // The below will make sure that if the ghost has multiple options for taking the next step, it doesn't retrace its step. This stops the ghost from oscillating between two adjacent cells and makes it move through the grid
    // if ((prevGhostStep == '') || (dirAvail.length == 1)){
    if (dirAvail.length == 1){
      //  do nothing if these conditions are satisfied
    } else {
      // putting in a rudimentary pacman seeking mechanism
      // 1. figure out where the ghost is relative to pacman. Possibilities are: leftup, up, rightup, right, rightdown, down, leftdown, left. Store this in dirToGo
      switch (true){
        case (pacman.x < ghost.x):
          dirToGo.push('l');
          switch (true){
            case (pacman.y < ghost.y):
              dirToGo.push('u');
              break;
            case (pacman.y > ghost.y):
              dirToGo.push('d');
              break;
          }
          break;
        case (pacman.x == ghost.x):
          switch (true){
            case (pacman.y < ghost.y):
              dirToGo.push('u');
              break;
            case (pacman.y > ghost.y):
              dirToGo.push('d');
              break;
          }
          break;
        case (pacman.x > ghost.x):
          dirToGo.push('r');
          switch (true){
            case (pacman.y < ghost.y):
              dirToGo.push('u');
              break;
            case (pacman.y > ghost.y):
              dirToGo.push('d');
              break;
          }
          break;
      }

      // 2. We have collected the possible directions of motion in dirAvail. Check if this contains the ideal directions identified above
      for (var i = 0; i < dirToGo.length; i++){
        if ($.inArray(dirToGo[i],dirAvail) > -1){
          dirMatch++;
          matchedDirs.push(dirToGo[i]);
        }
      }

      // 3. If all the ideal directions (max of 2) are also possible directions, then make sure that the ideal directions are the only possible directions available.
      if (dirMatch == dirToGo.length){
        dirAvail = [];
        for (var i = 0; i < dirToGo.length; i++){
          dirAvail.push(dirToGo[i]);
        }

      // If only one of the ideal directions is available as a possible direction, if it is the same as the previous direction the ghost was taking, make it the only possible option.
      } else if (matchedDirs[0] == prevGhostStep){ // using matchDirs[0] directly because at this point, the array can hold only one value
        dirAvail = [];
        dirAvail.push(matchedDirs[0]);

      // If only one of the ideal directions is available as a possible direction, and it is not the same as the previous direction the ghost was taking, check whether it is at right angles with previous direction and if yes make it the only option
      } else {
        switch (true){
          case (matchedDirs[0] == 'l' && prevGhostStep != 'r'):
          case (matchedDirs[0] == 'r' && prevGhostStep != 'l'):
          case (matchedDirs[0] == 'u' && prevGhostStep != 'd'):
          case (matchedDirs[0] == 'd' && prevGhostStep != 'u'):
            dirAvail = [];
            dirAvail.push(matchedDirs[0]);
            break;
          deafult:
      // If any of the above conditions arent satisfied, then go ahead and randomly pick the direction for the ghost
            if ((prevGhostStep == 'l') && ($.inArray('r',dirAvail) > -1)){dirAvail.splice($.inArray('r', dirAvail),1);}
            if ((prevGhostStep == 'r') && ($.inArray('l',dirAvail) > -1)){dirAvail.splice($.inArray('l', dirAvail),1);}
            if ((prevGhostStep == 'u') && ($.inArray('d',dirAvail) > -1)){dirAvail.splice($.inArray('d', dirAvail),1);}
            if ((prevGhostStep == 'd') && ($.inArray('u',dirAvail) > -1)){dirAvail.splice($.inArray('u', dirAvail),1);}
            break;
        }
        // } else {
        //   if ((prevGhostStep == 'l') && ($.inArray('r',dirAvail) > -1)){dirAvail.splice($.inArray('r', dirAvail),1);}
        //   if ((prevGhostStep == 'r') && ($.inArray('l',dirAvail) > -1)){dirAvail.splice($.inArray('l', dirAvail),1);}
        //   if ((prevGhostStep == 'u') && ($.inArray('d',dirAvail) > -1)){dirAvail.splice($.inArray('d', dirAvail),1);}
        //   if ((prevGhostStep == 'd') && ($.inArray('u',dirAvail) > -1)){dirAvail.splice($.inArray('u', dirAvail),1);}
        // }
      }
    }

    var next = Math.floor(Math.random() * dirAvail.length);

    gameBoardGrid[ghost.y][ghost.x] = ghostCellContent;

    switch (dirAvail[next]){
      case 'l':
        prevGhostStep = 'l';
        ghost.x -= 1;
        break;
      case 'r':
        prevGhostStep = 'r';
        ghost.x += 1;
        break;
      case 'u':
        prevGhostStep = 'u';
        ghost.y -= 1;
        break;
      case 'd':
        prevGhostStep = 'd';
        ghost.y += 1;
        break;
    }


    if ((ghost.x == pacman.x) && (ghost.y == pacman.y)){
      // do not update the ghosts position if it reaches pacman.
    } else {
      ghostCellContent = gameBoardGrid[ghost.y][ghost.x];
      gameBoardGrid[ghost.y][ghost.x] = GHS;
    }

    drawGameBoard();
  }

  function setupBoard() {

  }
  //
  // locate pacman and ghost at the beginning of the game.
  // This will allow us to change the hardcoded location of the characters in the
  // grid as we please without worrying about updating their location variables/objects
  //
  function findEm(){
    for (var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx++){
      for (var cellIdx = 0; cellIdx < gameBoardGrid[rowIdx].length; cellIdx++){
        if (gameBoardGrid[rowIdx][cellIdx] == PAC){
          pacman.x = cellIdx;
          pacman.y = rowIdx;
          pacman.last_x = cellIdx;
          pacman.last_y = rowIdx;
        }
        if (gameBoardGrid[rowIdx][cellIdx] == GHS){
          ghost.x = cellIdx;
          ghost.y = rowIdx;
          // console.log("ghost: row-" + rowIdx + " col-" + cellIdx);
        }
          // Count up the coins on the screen, so that we know if we finished
          // the level.
        if (gameBoardGrid[rowIdx][cellIdx] == COI){
          coins++;
        }
      }
    }
    console.log(coins)
  }
})

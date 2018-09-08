
/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null
/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
function checkCollision(rock) {
  // implement me! use the comments below to guide you!
  const top = positionToInteger(rock.style.top)
//console.log(top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    //console.log('bloop')
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    //DONE FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    //DONE FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;
    if((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge == rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)===true)/*
    
  rock's left edge is >= the DODGER's left edge and the rock's right edge is <= the DODGER's right edge
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
               {
      endGame()
      //return true
    }
  }
}
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  console.log(x)
  var top = 0
  rock.style.top = top
GAME.append(rock)
  function moveRock(el){
    var top = 10
    function step(){
      el.style.top = `${top += 2}px`
      if (top < 400){
        window.requestAnimationFrame(step)
      }
      checkCollision(rock)
    }
   window.requestAnimationFrame(step) 
}
  // We should kick of the animation of the rock around here
moveRock(rock);
  ROCKS.push(rock)
  console.log(ROCKS.length)
  // Finally, return the rock element you've created
  return rock
}
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  document.removeEventListener("keydown", moveDodger);
  var elem = document.querySelector('.rock');
elem.remove()
alert('you lose!')
   START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}
function moveDodger(e) {
  document.addEventListener('keydown', function(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
})
}
function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left > 0 && left <= 360) {
    dodger.style.left = `${left - 2}px`
  }
}
function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left >= 0 && left < 360) {
    dodger.style.left = `${left + 2}px`
  }
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}
function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 2000)
}
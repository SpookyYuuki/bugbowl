// Checks the defined game for accuracy
$(function(){

  var errors = []

  function imageExists(url) {
    var img = new Image();
    img.src = url;
    //var now = new Date().getTime();
    //while(new Date().getTime() < now + 5000);
    return img.height != 0;
  }

  function fileExists(url) {
    if(url){
      var req = new XMLHttpRequest();
      req.open('GET', url, false);
      req.send();
      return req.status == 200;
    } else {
      return false;
    }
  }

  function validateRebus(game){
    if (!game.image) errors.push(game.name + ' missing background image')
    if (!game.solution) errors.push(game.name + ' missing solution')

    //if (!imageExists(game.image)) errors.push(game.name + ' specified invalid image')
  }

  function validateIntermission(game){

  }

  function validateJeopardy(game){

  }

  // Check for environment requirements
  if (!localStorage.getItem) alert("ERROR: LocalStorage unavailable")

  // Check for existance of top level objects
  if (!GAMES || !Array.isArray(GAMES)) errors.push('No games defined')
  if (!CONFIG) errors.push('Global configuration object not defined')

  // Perform game specific vlaidations
  for (var i = 0; i < GAMES.length; ++i) {
    if (GAMES[i].type == "rebus") validateRebus(GAMES[i]);
    else if (GAMES[i].type == "intermission") validateIntermission(GAMES[i]);
    else if (GAMES[i].type == "jeopardy") validateJeopardy(GAMES[i]);
    else errors.push('Unknown game type defined: ' + GAMES[i].type);
  }

  // Validate configuration object
  if (!CONFIG.teams || !Array.isArray(CONFIG.teams) || !CONFIG.teams.length) errors.push('No teams defined')
  if (!CONFIG.rebusRow) errors.push('Number of rebus rows not defined')
  if (!CONFIG.rebusColumn) errors.push('Number of rebus columns not defined')

  // teams exist
  if (errors.length)
    alert("Errors were encountered in the game file: \n - " + errors.join("\n - "));

});
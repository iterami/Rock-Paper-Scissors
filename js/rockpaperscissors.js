'use strict';

function percent(value, max){
    return ((value / max) * 100).toFixed(7) + '%';
}

function play(selected){
    settings_save();

    // Check how many games player wants to play.
    var repeat = parseInt(
      document.getElementById('repeat').value,
      10
    );
    if(repeat < 1
      || isNaN(repeat)){
        return;
    }

    // Keep track of results.
    var opponent_plays = [
      0,
      0,
      0,
    ];
    var results = [
      0,
      0,
      0,
    ];
    total += repeat;

    // Loop through the games.
    var loop_counter = repeat - 1;
    do{
        // Result is a loss by default.
        var result = 0;

        // Generate a random number (0, 1, or 2).
        opponent_choice = random_integer({
          'max': 3,
        });
        opponent_plays[opponent_choice] += 1;

        // Check for ties.
        if(selected === opponent_choice){
            result = 2;

        // Check for wins.
        }else if((selected === 0 && opponent_choice === 2)
          || (selected === 1 && opponent_choice === 0)
          || (selected === 2 && opponent_choice === 1)){
            result = 1;
        }

        // Update loss/tie/win values and store them in a temporary array.
        results[result] += 1;
    }while(loop_counter--);

    losses += results[0];
    ties += results[2];
    wins += results[1];

    // Create result strings.
    var paper = opponent_plays[1] + ' papers (';
    var rock = opponent_plays[0] + ' rocks (';
    var scissors = opponent_plays[2] + ' scissors (';

    if(selected === 0){
        paper += 'losses) ' + percent(results[0], repeat);
        rock += 'ties) ' + percent(results[2], repeat);
        scissors += 'wins) ' + percent(results[1], repeat);

    }else if(selected === 1){
        paper += 'ties) ' + percent(results[2], repeat);
        rock += 'wins) ' + percent(results[1], repeat);
        scissors += 'losses) ' + percent(results[0], repeat);

    }else{
        paper += 'wins) ' + percent(results[1], repeat);
        rock += 'losses) ' + percent(results[0], repeat);
        scissors += 'ties) ' + percent(results[2], repeat);
    }

    // Display game information.
    document.getElementById('opponent').innerHTML = 'You played '
      + ['rock', 'paper', 'scissors',][selected]
      + ' ' + repeat + ' times.<br>'
      + 'Your opponent played:<br>'
        + rock + '<br>'
        + paper + '<br>'
        + scissors;
    document.getElementById('player').innerHTML =
      total + ' total games played<br>'
        + losses + ' losses (' + percent(losses, total) + ')<br>'
        + ties + ' ties (' + percent(ties, total) + ')<br>'
        + wins + ' wins (' + percent(wins, total) + ')';
}

function reset(){
    if(!window.confirm('Reset scores?')){
        return;
    }

    document.getElementById('opponent').innerHTML = '';
    document.getElementById('player').innerHTML = '';

    losses = 0;
    ties = 0;
    total = 0;
    wins = 0;
}

var losses = 0;
var opponent_choice = 0;
var selected = 0;
var ties = 0;
var total = 0;
var wins = 0;

window.onload = function(e){
    input_init({
      'keybinds': {
        80: {
          'todo': function(){
              play(1);
          },
        },
        82: {
          'todo': function(){
              play(0);
          },
        },
        83: {
          'todo': function(){
              play(2);
          },
        },
      },
    });
    settings_init({
      'prefix': 'RockPaperScissors.htm-',
      'settings': {
        'repeat': 1,
      },
    });

    settings_update();

    document.getElementById('paper').onclick = function(){
        play(1);
    };
    document.getElementById('reset').onclick = reset;
    document.getElementById('rock').onclick = function(){
        play(0);
    };
    document.getElementById('scissors').onclick = function(){
        play(2);
    };
};

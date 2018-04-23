// Write your game logic here in JavaScript
'use strict';

const outputBaskets = (Burgers, Hotdogs) => {
	if (Burgers < 0)
	{
		Burgers = 0;
	}
	if (Hotdogs < 0)
	{
		hotdogs = 0;
	}
	return (new Array(Burgers)).fill('🍔 ').join('') + (new Array(Hotdogs)).fill('🌭 ').join('');
};


const ranInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};


const start = (say, sendButton) => {
	const startB = ranInt(12,16);
	const startH = ranInt(12,16);
	const str = outputBaskets(startB, startH);
	const str1 = startB+'-'+startH+'-0-0-1';
	const str2 = startB+'-'+startH+'-0-0-0';
	say(str).then(() => {
		sendButton("Would you like to go first?", [{title: 'Yes', payload: str1}, {title: 'No', payload: str2}]);
	});
};

const state = (payload, say, sendButton) => {
	const ary = payload.split('-');
	var currentBurger = parseInt(ary[0]);
	var currentHotdog = parseInt(ary[1]);
	const deltaB = parseInt(ary[2]);
	const deltaH = parseInt(ary[3]);
	const playerTurn = parseInt(ary[4]);
	
	if (currentBurger - deltaB >= 0)
	{
		currentBurger = currentBurger - deltaB;
	}
	else
	{
		currentBurger = 0;
	}
	if (currentHotdog - deltaH >= 0)
	{
		currentHotdog = currentHotdog - deltaH;
	}
	else
	{
		currentHotdog = 0;
	}
	
	if (playerTurn === 1)
	{
		if (currentHotdog < 1 && currentBurger < 1)
		{
			say('🎉 Aha! I have taken the last food item! I won!').then(() =>
			{
				sendButton('Play again?', [
					{title: 'Yes!', payload: 'restart'},
					'No'
				]);
			});
		}
		else
		{
			const str = outputBaskets(currentBurger, currentHotdog);
			if (currentBurger < 1)
			{
				
				say(str).then(() =>
				{
					sendButton('It\'s your turn now! How many burgers and hotdogs would you like to take?',
					[{title: '1🌭', payload: currentBurger + '-' + currentHotdog + '-0-1-0'},
					{title: '2🌭', payload: currentBurger + '-' + currentHotdog + '-0-2-0'},
					{title: '3🌭', payload: currentBurger + '-' + currentHotdog + '-0-3-0'}]);
				});
			}
			else if (currentHotdog < 1)
			{
				
				say(str).then(() => {
					sendButton('It\'s your turn now! How many burgers and hotdogs would you like to take?',
					[{title: '1🍔', payload: currentBurger + '-' + currentHotdog + '-1-0-0'},
					{title: '2🍔', payload: currentBurger + '-' + currentHotdog + '-2-0-0'},
					{title: '3🍔', payload: currentBurger + '-' + currentHotdog + '-3-0-0'}]);
				});
			}
			else
			{
				
				say(str).then(() => {
					sendButton('It\'s your turn now! How many burgers and hotdogs would you like to take?',
					[{title: '1🍔', payload: currentBurger + '-' + currentHotdog + '-1-0-0'},
					{title: '2🍔', payload: currentBurger + '-' + currentHotdog + '-2-0-0'},
					{title: '3🍔', payload: currentBurger + '-' + currentHotdog + '-3-0-0'},
					{title: '1🌭', payload: currentBurger + '-' + currentHotdog + '-0-1-0'},
					{title: '2🌭', payload: currentBurger + '-' + currentHotdog + '-0-2-0'},
					{title: '3🌭', payload: currentBurger + '-' + currentHotdog + '-0-3-0'},
					{title: '1🍔🌭', payload: currentBurger + '-' + currentHotdog + '-1-1-0'},
					{title: '2🍔🌭', payload: currentBurger + '-' + currentHotdog + '-2-2-0'},
					{title: '3🍔🌭', payload: currentBurger + '-' + currentHotdog + '-3-3-0'}]);
				});
			}
			
		}
	}
	else if (playerTurn === 0) {
		if (currentHotdog < 1 && currentBurger < 1) {
			say('🎉 Great job! You have taken the last food item and won!').then(() => {
				sendButton('Try again?', [
					{title: 'Yes!', payload: 'restart'},
					'No'
				]);
			});
		}
		else {
			const str = outputBaskets(currentBurger, currentHotdog);
			say(str).then(() => {
				var pick = 3
				if (currentBurger > 0 && currentHotdog > 0)
				{
					
					pick = ranInt(1, 9);
				}
				else if (currentBurger > 0)
				{
					
					pick = ranInt(1, 3);
				}
				else
				{
					pick = ranInt(4, 6);
				}
				var dB = 0;
				var dH = 0;
				if (pick < 4)
				{
					dB = pick;
					dH = 0;
				}
				else if (pick > 3 && pick < 7)
				{
					dB = 0;
					dH = pick - 3;
				}
				else if (pick > 6)
				{
					dB = pick - 6;
					dH = dB;
				}
				say(`It\'s my turn now, and I will pick ${dB} burgers and ${dH} hotdogs` ).then(() => {
					const payloadStr = currentBurger + '-' + currentHotdog + '-' + dB +'-' + dH + '-1';
					state(payloadStr, say, sendButton);
				});
			});	
		}
	}
};



module.exports = {
	filename: 'wythoff',
	title: 'Wythoff Game',
	introduction: [
		'Wythoff Game is a two player math game which was played by people in ancient China which is similar to Nim.',
		'When the game starts, there are random numbers of hamburgers and hotdogs, each player could eat up to 3 hamburgers or hotdogs, or they could eat 3 of each food. The player to eat the last food item wins',
		'The number of each food item will range from 12 to 16, you could go first, then I will go next.'
	],
	start: start,
	state: state
};
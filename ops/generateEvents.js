const axios = require( 'axios' );

const serviceUrl = 'https://warm-woodland-81988.herokuapp.com';

const eventTypes = [
  'GOAL',
  'GOAL_ATTEMPT',
  'FOUL',
  'KEY_PASS',
  'PASS',
  'INTERCEPT',
  'BALL_POSSESSION',
  'ASSIST',
  'CORNER_KICK',
  'CROSS_ATTACK',
  'COUNTER_ATTACK',
  'DRIBBLE' 
];

const teams = ['manchester', 'lions']
const playersTeams = [
  { 
    team: teams[0],
    players: 'john_f'
  },
  {
    team: teams[1],
    player: 'juan_z'
  },
  {
    team: teams[0],
    player: 'Bryan_kennedy'
  },
  {
    team: teams[1],
    player: 'Zezinho_kennedy'
  }];


const baseEvent ={
  increment: 0,
  type: "GOAL",
  player: "john_f",
  timestamp: 123,
  team: "manchester",
};



const timeBetweenEvents = 1000;


let eventCounter = 0;
let gameStartTime = Date.now();
while(true) {
  setTimeout(async () => {
    const typeIndex = Math.floor(Math.random() * eventTypes.length);
    const playerTeamIndex = Math.floor(Math.random() * playersTeams.length);
    const newEvent = {
      increment: eventCounter++,
      type: eventTypes[typeIndex],
      player: playersTeams[playerTeamIndex].player,
      team: playersTeams[playerTeamIndex].team,
      timestamp: Date.now() - gameStartTime,
    };
    try {
      const result = await axios.post( `${serviceUrl}/events`, newEvent );
      console.log('Posted event');
    } catch (error) {
      console.log(error);
    }
  }, timeBetweenEvents * ( Math.max(Math.floor(Math.random() * 8), 1 ) ) );
}


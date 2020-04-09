//Canvas
var canvas;
var ctx;

//Game entities
var player;
var enemies = [];

//Game stats
var gamePlaying = true;
var lastSpawn = 0;
var lastSpawnCorona = 0;
var score = 0;
var speed = 3;
var insane = false;
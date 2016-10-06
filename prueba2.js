node --use_strict

var point = { x: 10, y: 10 };

point.x;
point.y;

var label = point.label;

point.label = 'origin';
point;

var menu = ['Attack', 'Defense', 'Inventory'];

menu.length;

menu.push('Magic');

menu.pop();

menu;
menu.length;
var item = menu[10];
typeof item; // será undefined.
menu[10] = 'Secret';
menu;
menu.length;

function getNextAliveEnemy() {
  var nextEnemy;
  if (aliveEnemies.length > 0) {
    nextEnemy = aliveEnemies[0];
  }
  else {
    nextEnemy = null;
  }
  return nextEnemy;
}

var hero = {
  name: 'Link',
  life: 100,
  weapon: { kind: 'sword', power: 20, magicPower: 5 },
  defense: { kind: 'shield', power: 5, magicPower: 0 },
  // Inventario por slots. Dos slots vacion y una último con 5 pociones.
  inventory: [
    { item: null, count: 0},
    { item: null, count: 0},
    { item: { kind: 'potion', power: 15 }, count: 5}
  ]
};

var enemy = {
  graphic: 'specie01.png',
  currentDirection: 'right',
  position: { x: 10, y: 10 },
  score: 40
};

var enemy = {
  _graphic: 'specie01.png',
  _currentDirection: 'right',
  _position: { x: 10, y: 10 },
  _score: 40
};

enemy._position.x = 100; 

var enemy = {
  _graphic: 'specie01.png',
  _currentDirection: 'right',
  _position: { x: 10, y: 10 },
  _score: 40,

  moveLeft: function () { console.log('Going left!'); },
  moveRight: function () { console.log('Going right!'); },
  advance: function () { console.log('Marching forward!'); },
  shoot: function () { console.log('PICHIUM!'); } // (es un láser)
};

enemy.shoot(); 
enemy.shoot = function () { console.log('PAÑUM!'); };
enemy.shoot(); 

enemy;
enemy.moveLeft();
enemy;

nemy.moveLeft = function () { this._position.x -= 2; };
enemy.moveRight = function () { this._position.x += 2; };
enemy.advance = function () { this._position.y += 2; };

enemy;
enemy.moveLeft();
enemy;


_______________________________________________________________

function newPoint(x, y) {
  var obj = {};
  obj.x = x;
  obj.y = y;
  return obj;
}

function newShot(position, velocity) {
  var obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = function () {
    this._position.y += this._velocity;
  };
  return obj;
}

var enemyShot = newShot(newPoint(15, 15), 2);

var allyShot = newShot(newPoint(15, 585), -2);

enemyShot !== allyShot;
true

var shotAPI = {
  advance: function () {
    this._position.y += this._velocity;
  }
};

function newShot(position, velocity) {
  var obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = shotAPI.advance;
  return obj;
}

function newShot(position, velocity) {
  var obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = newShot.api.advance;
  return obj;
}

newShot.api = {
  advance: function () {
    this._position.y += this._velocity;
  }
};

function newShot(position, velocity) {
  // Con esto la API es el prototipo del objeto.
  var obj = Object.create(newShot.api);
  obj._position = position;
  obj._velocity = velocity;
  return obj;
}

newShot.api = {
  advance: function () {
    this._position.y += this._velocity;
  }
};

var shot = newShot(newPoint(0,0), 2);
shot; 
shot.advance; 
shot.hasOwnProperty('advance');
Object.getPrototypeOf(shot).hasOwnProperty('advance');

function anyFunction() {}
anyFunction.prototype;
anyFunction.prototype.constructor === anyFunction;
true

function Hero(name) {
  this.name = name;
  this.sword = null;
  this.shield = null;
}

var hero = new Hero('Link');
hero;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Shot(position, velocity) {
  this._position = position;
  this._velocity = velocity;
}

Shot.prototype.advance = function () {
  this._position.y += this._velocity;
};

var enemyShot = new Shot(new Point(15, 15), 2);
var allyShot = new Shot(new Point(15, 585), -2);
enemyShot !== allyShot;
true

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Shot(position, velocity) {
  this._position = position;
  this._velocity = velocity;
}

Shot.prototype.advance = function () {
  this._position.y += this._velocity;
};

function Enemy(graphic, position, score) {
  this._graphic = graphic;
  this._currentDirection = 'right';
  this._position = position;
  this._score = score;
}

Enemy.prototype.moveLeft = function () { this._position.x -= 2; };
Enemy.prototype.moveRight = function () { this._position.x += 2; };
Enemy.prototype.advance = function () { this._position.y += 2; };

Enemy.prototype.shoot = function () {
  var firePosition = new Position(this._position.x, this._position.y + 10);
  var shot = new Shot(firePosition, 2);
  return shot;
};

function Ally(position) {
  this._graphic = 'ally.png';
  this._position = position;
}

Ally.prototype.moveLeft = function () { this._position.x -= 2; };
Ally.prototype.moveRight = function () { this._position.x += 2; };
Ally.prototype.shoot = function () {
  var firePosition = new Position(this._position.x, this._position.y - 10);
  var shot = new Shot(firePosition, -2);
  return shot;
};

function Ship(graphic, position) {
  this._graphic = graphic;
  this._position = position;
}

Ship.prototype.moveLeft = function () { this._position.x -= 2; };
Ship.prototype.moveRight = function () { this._position.x += 2; };

function Enemy(graphic, position, score) {
  Ship.apply(this, [graphic, position]);
  this._currentDirection = 'right';
  this._score = score;
}

function Ally(position) {
  Ship.apply(this, ['ally.png', position]);
}

Enemy.prototype;

Enemy.prototype = Object.create(Ship.prototype);

Enemy.prototype;

Enemy.prototype.constructor = Enemy;

Enemy.prototype.advance = function () {
  this._position.y += 2;
};

Enemy.prototype.shoot = function () {
  var firePosition = new Point(this._position.x, this._position.y + 10);
  var shot = new Shot(firePosition, 2);
  return shot;
};

Ally.prototype = Object.create(Ship.prototype);
Ally.prototype.constructor = Ally

Ally.prototype.shoot = function () {
  var firePosition = new Point(this._position.x, this._position.y - 10);
  var shot = new Shot(firePosition, -2);
  return shot;
};

var enemy = new Enemy('enemy1.png', new Point(10, 10), 40);
var ally = new Ally(new Point(10, 590));

Object.getPrototypeOf(ally) === Ally.prototype;
Object.getPrototypeOf(enemy) === Enemy.prototype;
Ally.prototype !== Enemy.prototype;
Object.getPrototypeOf(Ally.prototype) === Object.getPrototypeOf(Enemy.prototype);
Object.getPrototypeOf(Ally.prototype) === Ship.prototype;

enemy.hasOwnProperty('_score');
enemy.hasOwnProperty('advance');
enemy.hasOwnProperty('moveLeft');

Enemy.prototype.hasOwnProperty('_score');
Enemy.prototype.hasOwnProperty('advance');
Enemy.prototype.hasOwnProperty('moveLeft');

Ship.prototype.hasOwnProperty('_score');
Ship.prototype.hasOwnProperty('advance');
Ship.prototype.hasOwnProperty('moveLeft');

enemy instanceof Enemy;  // el primer eslabón.
enemy instanceof Ship;   // el segundo.
enemy instanceof Object; // el tercero.

enemy instanceof Ally;


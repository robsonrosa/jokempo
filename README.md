# jokenpo

## Structure
### Core
Game coding

* Game (all properties are private - can't be change after its creation)
  * getName(): `string`
  * getDescription(): `string`
  * getOptions(): `GameOptionCollection`
  * getPreferences(): `GamePreference[]`  (future)

* GameOption (all properties are private - can't be change after its creation)
  * getName(): `string`
  * getWins(): `GameOption[]` (options which lose from this one)
  * getLoses(): `GameOption[]` (options which win this one)

* GameOptionCollection (to ensure that the options won't be changed after the game starts)
  * options: `GameOption[]` (private)
  * add: `GameOption`
  * get: `GameOption[]` (a copy)

* GameFactory
  * constructor(validator: `GameValidator`)
  * create(settings: `json`): `Game`

* GameMatchFactory
  * constructor(validator: `GameMatchValidator`)
  * create(game: `Game`, playerOptions: `PlayerOption[]`): `GameMatch`
  
* GameMatchValidator
  * validate(match: `GameMatch`): `boolean`

* GameValidator
  * validate(settings: `json`): `boolean`

* GameMatch (a match with many  players)
  * constructor(game: `Game`, playerOptions: `PlayerOption[]`)
  * result(): `MatchResult[]`

* GameDuel (a match with only two players)
  * constructor(game: `Game`, playerOne: `PlayerOption`, playerTwo: `PlayerOption`)
  * result(): `MatchResult`

* MachinePlayer
  * constructor(game: `Game`)
  * play(): `PlayerOption`

* PlayerOption
  * name: `string`
  * choice: `GameOption`

* MatchResult
  * hasWinner(): `boolean`
  * getWinner(): `string`
  * getloser(): `string`
  * toString(): `string` (pre checked message for winner or draw)

* Settings Structure
    ```
    {
        "name": "Test",
        "description": "Test Description",
        "options": [{
            "name": "name1",
            "wins": ["name2"],
            "loses": ["name3"]
        }, {
            "name": "name2",
            "wins": ["name3"],
            "loses": ["name1"]
        }, {
            "name": "name3",
            "wins": ["name1"],
            "loses": ["name2"]
        }],
        //preferences: { machinePlayerNames: ['bot1', 'bot2', 'bot3'] }
    }
    ```
#### Expected Coding (Pseudocode)
```
let settings = require('settings');

let game = new GameFactory().create(settings);
let p1 = new MachinePlayer(game).play();
let p2 = new MachinePlayer(game).play();
let result = new GameDuel(game).between(p1).and(p2);

console.log(result);
```

### App
Web application to run the Game
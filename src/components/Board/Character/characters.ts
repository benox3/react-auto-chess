export enum CharNames {
  DRUID = 'druid',
  SORCERER = 'sorcerer',
}

export type Level = {
  hp: number;
  damage: number;
  attacksPerSecond: number;
  image: string;
};

export default {
  [CharNames.DRUID]: {
    name: CharNames.DRUID,
    levels: [
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/druid.gif',
      },
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/druid.gif',
      },
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/druid.gif',
      },
    ],
  },
  [CharNames.SORCERER]: {
    name: CharNames.SORCERER,
    levels: [
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/sorcerer.gif',
      },
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/sorcerer.gif',
      },
      {
        hp: 200,
        damage: 20,
        attacksPerSecond: 1,
        image: './assets/sorcerer.gif',
      },
    ],
  },
};

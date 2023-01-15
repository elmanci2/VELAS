//import liraries

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("addcapitulos.db");
//// create tabla

export const createTable = () => {
  db.transaction((tx) => {
    try {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS series (id INTEGER PRIMARY KEY NOT NULL, name TEXT UNIQUE, last_episode INTEGER);"
      );

      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY, title TEXT, poster TEXT);",
          [],
          (_, result) => {}
        );
      });

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lastime (id INTEGER PRIMARY KEY NOT NULL, id TEXT UNIQUE, time INTEGER);"
      );

      console.log("tabla creada");
    } catch (error) {
      console.log(error);
    }
  });
};

export const insertLastEpisode = (name: string, episode: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT OR REPLACE INTO series (name, last_episode) VALUES (?, ?);",
      [name, episode],
      (_, result) => {}
    );
  });
};

export const fetchLastEpisode = (name: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT last_episode FROM series WHERE name = ?;",
        [name],
        (_, { rows: { _array } }) => resolve(_array)
      );
    });
  });
};

////  fovorites db

export const removeFromFavoritesSQLite = (id: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM favorites WHERE id = ?;",
      [id],
      (_, result) => {}
    );
  });
};

export const addToFavoritesSQLite = (item: {
  id: string;
  title: string;
  poster: string;
}) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO favorites (id, title, poster) VALUES (?, ?, ?);",
      [item.id, item.title, item.poster],
      (_, result) => {}
    );
  });
};

export const clearFavoritesSQLite = () => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM favorites;", [], (_, result) => {});
  });
};

export const getFavorites = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        }
      );
    });
  });
};

//// continua video last time

export const saveTimePosition = (id: string, time: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT OR REPLACE INTO series (id, time) VALUES (?, ?);",
      [id, time],
      (_, result) => {}
    );
  });
};

export const getTime = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM lastime", [], (_, { rows: { _array } }) => {
        resolve(_array);
      });
    });
  });
};

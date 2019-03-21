const fs = require('fs');
const app = {};

app.sum = (a, b) => {
  return a + b;
};

app.getRepository = (collection) => {
  let db;
  let selected;
  try {
    console.log('[LOGGER] Fez a leitura do arquivo repository.json para a coleção: ' + collection);
    db = JSON.parse(fs.readFileSync('repository.json', "utf8"));
    selected = db[collection];
  } catch(error) {
    console.error('[ERROR] Não fez a leitura do arquivo repository.json')
  }
  return selected;
};

app.writeRepository = () => {
  const db = app.getRepository('used');
  console.log(db);
  db.push('OPaaaaa', 'Nusssss');
  console.log(db);

  fs.writeFile('repository.json', "Hey there!", function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};

app.getRandomCombination = () => {
  const names = app.getRepository('names');
  const adjectives = app.getRepository('adjectives');
  const comb = names[Math.floor(Math.random() * names.length)] + ' ' + adjectives[Math.floor(Math.random() * adjectives.length)];
  if (app.verifyBlackList(comb)) {
    app.getRandomCombination();
  } else {
    return comb;
  }
};

app.verifyBlackList = (combination) => {
  const blackList = app.getRepository('blackList');
  let hasInBlackList = false;
  blackList.forEach((itemBlack) => {
    if (itemBlack === combination) {
      hasInBlackList = true;
    }
  });
  return hasInBlackList;
};

app.init = () => {
  try {
    console.log('[LOGGER] Iniciou a aplicação');
    switch (process.argv[2]) {
      case '--get':
        console.log(app.getRepository('names'));
        break;
      case '--post':
        console.log(app.writeRepository());
        break;
      case '--random':
        console.log(app.getRandomCombination());
        break;
      case '--opa':
        console.log(app.test());
        break;
    }
  } catch(error) {
    console.error('[ERROR] Falha ao iniciar a aplicação');
  }
};

module.exports = app;

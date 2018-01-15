let killPhraseGen = number => {
  let phrase = [];
  for (let i = 0; i < number; i++) {
    let randomN = Math.floor(Math.random() * words.length);
    let randomW = words[randomN];
    phrase.push(randomW);
    const index = words.indexOf(randomW);
    words.splice(index, 1);
  }
  phrase = phrase.join(' - ');
  return phrase;
};

let generateShortId = () => {
  var ALPHABET = '23456789abdegjkmnpqrvwxyz';
  var ID_LENGTH = 6;
  var rtn = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};

let resetDb = () => {
  localDb
    .destroy()
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};

let pushToLocalDb = data => {
  localDb
    .post(data)
    .then(res => {
      console.log('Success', res);
      PouchDB.replicate(localDb, remoteDb)
        .on('complete', function() {
          console.log('Sync complete');
        })
        .on('error', function(err) {
          console.log(err);
        });
    })
    .catch(err => {
      console.log('Error', err);
    });
};

let fetchRecords = () => {
  localDb.allDocs({ include_docs: true }).then(data => {
    console.log(data.rows);
  });
};

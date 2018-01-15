const localDb = new PouchDB('agents');
const remoteDb = new PouchDB(
  'http://administrator:justABitOfFun!@35.226.150.154:5984/agents'
);

$('#userNew').click(e => {
  e.preventDefault();

  let recordNumber;
  localDb.allDocs({ include_docs: true }).then(data => {
    let agent = {
      number: data.rows.length + 1,
      shortId: generateShortId(),
      name: $('[name=name]').val(),
      dept: $('[name=dept]').val(),
      phone: $('[name=phone]').val(),
      active: 1,
      kills: 0,
      phraseToKill: killPhraseGen(3)
    };

    pushToLocalDb(agent);
  });
});

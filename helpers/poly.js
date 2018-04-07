const request = require(`request`);
const {TOKEN} = require(`../configOption`);
const {save} = require(`../database/index`);

const getPolyObjects = (topic) => {

  let option = {
    url: `https://poly.googleapis.com/v1/assets?category=${topic}&format=OBJ&orderBy=BEST&pageSize=5&key=${TOKEN}`
  };

  request(option, (err, res, body) => {
    if (err) {return console.error(`Your POLY request ran into problems: ${err}`);}
    
    let results = JSON.parse(body).assets;
    console.log(`parsed payload from POLY request: ${results}`);
    
    if (results) {
      results.forEach((object) => {
        object.category = topic;
        console.log('obj category saved?', object.category);
        save(object);
      })
    }

  });
}

module.exports.polyRequest = getPolyObjects;
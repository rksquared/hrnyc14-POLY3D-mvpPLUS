const mongoose = require(`mongoose`);
const {MLAB} = require(`../configOption`);

//initialize connection with DB
mongoose.connect(MLAB);


//create the schema
let objectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }, //check for uniqueness
  displayName: String,
  creator: String,
  createdAt: Date,
  description: String,
  thumbnail: Object,
  format: Array,
  presentationParams: Object,
  category: String,
});

//create ODM interface to interact with DB collectiosn
let Object3D = mongoose.model(`Object3D`, objectSchema);

//process each record in API results payload and save to DB
let save = ({name, displayName, authorName, description, createTime, formats, thumbnail, presentationParams, category}) => {

  console.log('category in save', category, name);
  let object3D = new Object3D({
    name: name,
    displayName: displayName,
    creator: authorName,
    createdAt: createTime,
    description: description,
    thumbnail: thumbnail,
    format: formats.reduce((OBJlist, entry) => (entry.formatType === `OBJ` ? OBJlist.push(entry) : OBJlist, OBJlist), []),
    thumbnail: thumbnail,
    presentationParams: presentationParams,
    category: category
  });

  console.log(`registering ${object3D} to DB`);
  console.log('saved object topic', object3D.category);


  object3D.save((err) => {
    if (err) {return console.error(err)}
    console.log(`repo saved`);
  });

}

let retrieveObjects = (filter) => {
  console.log('filter in retrieve obj', filter);
  if (filter === '') {
    return Object3D.find().limit(10).sort(`-createdAt`).exec(); 
  }
  return Object3D.find().where('category').equals(filter).limit(10).sort(`-createdAt`).exec();
}


module.exports.save = save;
module.exports.retrieveObjects = retrieveObjects;
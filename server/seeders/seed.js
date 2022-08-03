const db = require('../config/connection');
const { User, Rant } = require('../models');
const userSeeds = require('./userSeeds.json');
const rantSeeds = require('./rantSeeds.json');

db.once('open', async () => {
  try {
    await Rant.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < rantSeeds.length; i++) {
      const { _id, rantAuthor } = await Rant.create(rantSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: rantAuthor },
        {
          $addToSet: {
            rants: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

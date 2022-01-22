const express = require('express');
const Users = require('../models/users');

const router = new express.Router();

router.post('/api/users', async (req, res) => {
  console.log(req.body);
  const user = new Users(req.body);
  //check if user already exist
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send('users');
  } catch (err) {
    res.status(500).send();
  }
});

// router.get('/api/products/actives', async (req, res) => {
//   try {
//     const activProduct = await Accounts.find({ isActive: true });
//     if (!activProduct) {
//       return res.status(404).send();
//     }
//     res.status(200).send(activProduct);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// router.get('/api/price/:min/:max', async (req, res) => {
//   const min = req.params.min;
//   const max = req.params.max;

//   try {
//     const products = await Accounts.find({
//       $and: [
//         { 'details.Price': { $gte: min } },
//         { 'details.Price': { $lte: max } },
//       ],
//     });
//     if (!products) {
//       return res.status(400).send();
//     }
//     res.status(200).send(products);
//   } catch {
//     res.status(500).send();
//   }
// });

router.get('/api/users/:id', async (req, res) => {
  const passportID = req.params.id;
  try {
    const user = await Users.findOne({ passportID });
    if (!user) {
      return res.status(404).send('user not exists');
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/api/users/deposit/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'isActive', 'passportID', 'cash'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(404).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      req.body.passportID,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// router.delete('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Accounts.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).send();
//     }
//     res.status(200).send(product);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// router.delete('/api/products', async (req, res) => {
//   try {
//     const products = await Accounts.deleteMany({});

//     if (!products || products.deletedCount === 0) {
//       return res.status(404).send('No products');
//     }
//     res.status(200).send(products);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

module.exports = router;

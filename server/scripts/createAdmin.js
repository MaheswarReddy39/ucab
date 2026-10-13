// Promote an existing registered user to admin.
// Usage (from server/): node scripts/createAdmin.js user@example.com
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const run = async () => {
  const email = process.argv[2];

  if (!email) {
    console.log("Usage: node scripts/createAdmin.js <email>");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: "admin" },
    { new: true }
  );

  if (!user) {
    console.log(`No user found with email ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`${user.email} is now an admin`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.log(error.message);
  await mongoose.disconnect();
  process.exit(1);
});

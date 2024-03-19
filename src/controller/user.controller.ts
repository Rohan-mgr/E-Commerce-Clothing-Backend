import User from "../model/user.model";
import { handleAsync, hashPassword } from "../utils/helper";

export const createUser = handleAsync(async (req, res) => {
  const { email, password, firstName, lastName, mobile, shippingAddress } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists!") as Error & { statusCode: 400 };
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({ email, password: hashedPassword, firstName, lastName, mobile, shippingAddress });

  await newUser.save();
  return res.status(200).json({
    message: "User Registered Successfully",
  });
});

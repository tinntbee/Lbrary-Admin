import bcryptjs from "bcryptjs";

export const hashIt = async (password) => {
  const salt = "$2a$06$i2IwBalQGI5lHqhqpbEnt.";
  const hashed = await bcryptjs.hash(password, salt);
  return hashed;
};

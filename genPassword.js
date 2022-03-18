import bcrypt from "bcrypt";

//generate hash password
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt, "\n", hashedPassword);
  return hashedPassword;
}

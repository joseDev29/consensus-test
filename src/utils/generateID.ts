import { generate } from "generate-password";

export const generateID = () => {
  return generate({
    length: 10,
    numbers: true,
    uppercase: true,
    symbols: false,
  });
};

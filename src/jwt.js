import { jwtDecode } from 'jwt-decode';
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Validar um token JWT
// export const validateToken = (token) => {
//   try {
//     jwt.verify(token, SALT);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// const isValid = validateToken(token);
// console.log('Token válido:', isValid);

import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub, 
    _type: 'user',
    userName: name,
    image: picture,
  };

  addUser(user);

  try {
    await axios.post(`${BASE_URL}/api/auth`, user); 
  } catch (err) {
    console.error('Error creating user in Sanity:', err);
  }
};

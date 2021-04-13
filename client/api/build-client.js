import axios from 'axios';

const client = ({ req }) => {
  if (typeof window === 'undefined') {
    
    return axios.create({
      baseURL: 'http://www.my-ticketing-app-prod.club',
      headers: req.headers
    });
  } else {
    return axios.create({
      baseUrl: '/'
    });
  }
}

export default client;
import axios from 'axios';

let myUrl = 'http://localhost:5000/api/';
if (process.env.NODE_ENV === 'production') {
  myUrl = 'api';
}

export default axios.create({
  baseURL: myUrl,
});

const baseurl = 'http://localhost:3001';

async function request(method, endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  const options = { method, headers: {} };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers['content-type'] =  'application/json';
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    console.error('Error fetching', error);
    return {
      status: 500,
      result: {
        errors: [{ message: 'Error fetching data' }]
      }
    }
  }

  if (response.status === 204) {
    return {
      status: response.status,
      result: null
    }
  }

  const result = await response.json();

  return {
    status: response.status,
    result
  }
}

export default {
  get: request.bind(null, 'GET'),
  post: request.bind(null, 'POST'),
  patch: request.bind(null, 'PATCH'),
  upload: request.bind(null, 'POST'),
  delete: request.bind(null, 'DELETE'),
};
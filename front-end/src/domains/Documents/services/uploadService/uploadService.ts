import axios from 'axios';

export const uploadService = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios.post('upload', formData, config)
};
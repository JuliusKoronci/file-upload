import axios from 'axios';
import { IDocument } from '../../types';

export const deleteService = (item: IDocument) => {
  return axios.delete(`delete/${item.slug}`)
};
import { BASE_URL } from '../../../../app/api';
import { IDocument } from '../../types';

/**
 * Generate download link for a single document
 */
export const getDownloadLink = (item: IDocument) => `${BASE_URL}download/${item.slug}`;
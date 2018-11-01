import { IDocument } from '../../types';
import { getDownloadLink } from '../getDownloadLink';

describe('getDownloadLink', () => {
  it('should return the correct download link', () => {
    expect(getDownloadLink({ slug: 'test' } as IDocument)).toEqual('http://symfony.localhost/download/test');
  });
});
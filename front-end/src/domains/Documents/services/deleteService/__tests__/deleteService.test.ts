import axios from 'axios';
import { IDocument } from '../../../types';
import { deleteService } from '../deleteService';

jest.mock('axios');

describe('deleteService', () => {
  it('should call the delete endpoint', () => {
    deleteService({ slug: 'myslug' } as IDocument);
    // typescript complains about missing prop mock hence referencing as any
    // for testing
    const mockAxios = axios as any;
    expect(mockAxios.delete.mock.calls[0][0]).toEqual('delete/myslug');
  });
});
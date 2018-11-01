import axios from 'axios';
import { uploadService } from '../uploadService';

jest.mock('axios');

describe('deleteService', () => {
  it('should call the delete endpoint', () => {
    uploadService(new File([], 'name'));
    // typescript complains about missing prop mock hence referencing as any
    // for testing
    const mockAxios = axios as any;
    expect(mockAxios.post.mock.calls[0][0]).toEqual('upload');
  });
});
import axios from 'axios';
import { documentsService } from '../documentsService';

jest.mock('axios');

describe('documentsService', () => {
  it('should call the correct endpoint', () => {
    documentsService();
    // typescript complains about missing prop mock hence referencing as any
    // for testing
    const mockAxios = axios as any;
    expect(mockAxios.get.mock.calls[0][0]).toEqual('documents');
  });
});
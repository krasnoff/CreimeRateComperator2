import { renderHook } from '@testing-library/react-native';
import { useLoadCategories } from '../useLoadCategories';

// Mock the JSON imports
jest.mock('../../assets/json/merged_felonies_sorted.json', () => ([{ id: 1, title: 'Felony1' }]), { virtual: true });
jest.mock('../../assets/json/merged_location.json', () => ([{ id: 10, title: 'Location1' }]), { virtual: true });

describe('useLoadCategories', () => {
  it('should load felonies and location from JSON files', () => {
    const { result } = renderHook(() => useLoadCategories());

    expect(Array.isArray(result.current.felonies)).toBe(true);
    expect(Array.isArray(result.current.location)).toBe(true);

    expect(result.current.felonies.length).toBeGreaterThan(0);
    expect(result.current.location.length).toBeGreaterThan(0);

    expect(result.current.felonies[0]).toEqual({ id: 1, title: 'Felony1' });
    expect(result.current.location[0]).toEqual({ id: 10, title: 'Location1' });
  });
});
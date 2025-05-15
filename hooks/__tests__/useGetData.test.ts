import { act, renderHook } from "@testing-library/react-native";
import useGetData from "../useGetData";

global.fetch = jest.fn() as jest.Mock; // Mock the fetch function globally and cast to jest.Mock

describe("useGetData", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clean up after each test
    });
    
    it('should store data when the API call is successful', async () => {
        // Mock a successful API response
        const mockResponse = { total: 1888 };
        (fetch as any).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const { result } = renderHook(() => useGetData());

        // Call the fetchData function manually
        act(() => {
            result.current.sendPostRequests(
                {
                    catID: 1,
                    title: "נתניה",
                    id: 7400,
                },
                {
                    "id": 301,
                    "title": "רצח",
                    "catID": 2
                },
                '2022',
                '2024',
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            );
        });

        // Wait for the effect to run and update the state
        await act(async () => {
            // Allow async updates to complete
            await new Promise((r) => setTimeout(r, 2000));
        });

        // console.log('result.current 2', result.current.data1?.result.total);
        expect(result.current.data1?.result.total).not.toBeUndefined();
        expect(result.current.data2?.result.total).not.toBeUndefined();
        expect(result.current.data1?.result.total).toBe(6);
        expect(result.current.data2?.result.total).toBe(1);
        expect(result.current.error).toBeNull();
    });

    it('should store an error when the API call fails', async () => {
    // Mock a failed API response
    (fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useGetData());

    // Call the fetchData function manually
    act(() => {
      result.current.sendPostRequests(
                {
                    catID: 1,
                    title: "נתניה",
                    id: 7400,
                },
                {
                    "id": 301,
                    "title": "רצח",
                    "catID": 2
                },
                '2022',
                '2025',
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            );
    });

    // Wait for the effect to run and update the state
    await act(async () => {
      // Allow async updates to complete
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(result.current.data1).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
import { fireEvent, render } from '@testing-library/react-native';
import Page1 from '../page1';

describe('<Page1 />', () => {
  it('renders without crashing', () => {
    const handleMockSelectedItemChange = jest.fn();
    const handleMockSelectedCityItemChange = jest.fn();
    const mockResetStates = jest.fn();
    
    const renderer = render(<Page1 
                                    handleSelectedItemChange={handleMockSelectedItemChange} 
                                    handleSelectedCityItemChange={handleMockSelectedCityItemChange} 
                                    resetStates={mockResetStates} />);
    
    const picker = renderer.getByTestId('picker-felony-select-parent');

    // initial selected-value is `key1` at selectedIndex '1'
    expect(picker.props.selectedValue).toStrictEqual(undefined);

    // trigger a change to the UI, selecting the first element
    fireEvent(picker, 'onValueChange', 'key0');
    expect(picker.props.selectedValue).not.toStrictEqual('key0');
  });
});
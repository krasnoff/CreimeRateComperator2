import { render } from '@testing-library/react-native';
import MainPage from '../app/index';

describe('<MainPage />', () => {
  test('Text renders correctly on MainPage', () => {
    const { getByText } = render(<MainPage />);

    // Check if the text "בחר קריטריונים להשוואה" is rendered
    getByText(/בחר קריטריונים להשוואה/gi);
  });
});
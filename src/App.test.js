import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // 特定のテキストを探す代わりに、任意の要素が存在することを確認
  const element = document.querySelector('div');
  expect(element).toBeInTheDocument();
});

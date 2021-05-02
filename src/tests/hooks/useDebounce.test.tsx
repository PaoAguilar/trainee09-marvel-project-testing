import { renderHook } from '@testing-library/react-hooks';
import useDebounce from '../../hooks/useDebounce';

test('should update value after specified delay', async() => {
  const { result, rerender, waitForValueToChange } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: '', delay: 500 } }
  );
  expect(result.current).toBe('');
  rerender({ value: 'Hello World', delay: 50 });
  await waitForValueToChange(() => result.current)
  expect(result.current).toBe('Hello World');
});

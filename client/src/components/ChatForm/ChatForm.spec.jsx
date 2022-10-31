import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../store/redux-hooks';
import ChatForm from './ChatForm';

jest.mock("../../store/redux-hooks");

describe("ChatForm", () => {

  const dispatch = jest.fn();

  beforeEach(() => {
    useAppDispatch.mockImplementation(() => dispatch)
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should call a dispatch once after enter press', () => {
    render(<ChatForm />);
    userEvent.keyboard("{enter}");
    expect(useAppDispatch).toHaveBeenCalledTimes(1);
  });

  it('should call a dispatch after button press', () => {
    render(<ChatForm />);
    const btn = screen.getByTestId('send-button-test')
    fireEvent.click(btn,)
    expect(useAppDispatch).toHaveBeenCalledTimes(1);
  });
})



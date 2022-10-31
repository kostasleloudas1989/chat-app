import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAppSelector } from '../../store/redux-hooks';
import ChatComponent from './ChatComponent';

jest.mock("../../store/redux-hooks");

describe("ChatComponent", () => {

  const initialState = {
    messages: [
      {
        type: "chat",
        payload: {
          from: "kostas",
          text: "hello world"
        }
      }
    ]
  }
  const testUseAppSelector = (f) => f(initialState);

  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();

  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should call selector', () => {
    render(<ChatComponent />);
    expect(useAppSelector).toHaveBeenCalled();
  });

  it('should render username tag and message box element', () => {
    render(<ChatComponent />);
    expect(screen.getByText("kostas")).toBeInTheDocument();
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
})



import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import App from "../App";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const mockInitialState = {
  search: {},
};
const store = mockStore(mockInitialState);

const MockApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const mockIntersectionObserver = () => {
  const intersectionObserverMock = jest.fn();
  intersectionObserverMock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = intersectionObserverMock;
};

const mockWindowMatchMedia = () => {
  const windowMatchMediaMock = () => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  });
  window.matchMedia = windowMatchMediaMock;
};

describe("App component", () => {
  beforeAll(() => {
    // IntersectionObserver isn't available in test environment
    mockIntersectionObserver();
    mockWindowMatchMedia();
  });

  it("should match the snapshot", () => {
    const tree = renderer.create(<MockApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

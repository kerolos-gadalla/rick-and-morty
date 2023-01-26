import { Provider } from "react-redux";
import { store } from "./store";

export function withRedux<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useReducer } from "react";
import "./App.css";

const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const START_SUBMIT = "START_SUBMIT";
const FINISH_SUBMIT = "FINISH_SUBMIT";
function formReducer(state, action) {
  switch (action.type) {
    case UPDATE_EMAIL: {
      const currentFormState = state.formState;
      // can't submit again if it's already been submitted
      if (
        (currentFormState === "submitting") |
        (currentFormState === "submitted")
      ) {
        return;
      }
      const formState = !state.password || !action.email ? "invalid" : "valid";
      return { ...state, formState, email: action.email };
    }
    case UPDATE_PASSWORD: {
      const currentFormState = state.formState;
      // can't submit again if it's already been submitted
      if (
        (currentFormState === "submitting") |
        (currentFormState === "submitted")
      ) {
        return;
      }
      const formState = !action.password || !state.email ? "invalid" : "valid";
      return { ...state, formState, password: action.password };
    }
    case START_SUBMIT: {
      return { ...state, formState: "submitting" };
    }
    case FINISH_SUBMIT: {
      return { ...state, formState: "submitted" };
    }
    default: {
      throw new Error(`unsupported action type ${action.type}`);
    }
  }
}

const initialState = {
  email: "",
  password: "",
  formState: "invalid", // 'invalid' | 'valid' | 'submitting' |'submitted' | 'error'
};
function App() {
  const [{ email, password, formState }, dispatch] = useReducer(
    formReducer,
    initialState
  );

  return (
    <div className="App">
      <header>
        <h1>Welcome!</h1>
      </header>
      {formState === "submitted" ? (
        <h2>You are logged in!</h2>
      ) : (
        <form
          css={css`
            width: 200px;
            margin: 2rem auto;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1.5rem 0.5rem;
            justify-items: start;
          `}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: START_SUBMIT });
            // simulate an asynchronous action
            setTimeout(() => {
              dispatch({ type: FINISH_SUBMIT });
            }, 1000);
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              dispatch({
                type: UPDATE_EMAIL,
                email: e.currentTarget.value,
              });
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              dispatch({
                type: UPDATE_PASSWORD,
                password: e.currentTarget.value,
              });
            }}
          />

          <button
            type="submit"
            css={css`
              grid-column: 1 / -1;
              width: 100%;
            `}
            disabled={formState !== "valid"}
          >
            {formState === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

import "./App.css";
import "antd/dist/antd.css";
import SignUp from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import StartQuiz from "./Pages/StartQuiz";
import store from "./Redux/store";
import { Provider } from "react-redux";
import QuestionDemo from "./Components/QuestionDemo";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />}/>
          <Route path='quiz' element={<StartQuiz />} />
          <Route path="redux" element={<QuestionDemo/>}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;



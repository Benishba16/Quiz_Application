import "./App.css";
import "antd/dist/antd.css";
import SignUp from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import StartQuiz from "./Pages/StartQuiz";
import store from "./Redux/store";
import { Provider } from "react-redux";
import Questions from "./Components/Questions";
import Score from "./Components/Score";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='login' element={<Login />} />
          <Route path='quiz' element={<StartQuiz />} />
          <Route path='question' element={<Questions />} />
          <Route path="score" element={<Score/>}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

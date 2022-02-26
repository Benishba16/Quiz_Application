import React, { useState } from "react";
import { Button, Select } from "antd";
import Categories from "./Categories";
import "./StartQuiz.css";
import QuizInfo from "../Components/QuizInfo";
import { connect } from "react-redux";
import { categoryValue, typeValue } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function StartQuiz(props) {

  const navigate = useNavigate();

  let [category, setCategory] = useState("");
  let [mode, setMode] = useState("");

  const options = [
    { id: 1, value: "easy" },
    { id: 2, value: "medium" },
    { id: 3, value: "hard" },
  ];

  const handleCategory = (data) => {
    category = data;
    setCategory(category);
    console.log("Category", category);
    props.onCategotyValue(category);
  };

  const handleType = (data) => {
    mode = data;
    setMode(mode);
    console.log("Mode", mode);
    props.onModeValue(mode);
  };

  
  return (
    <div>
      <div className='quiz_info'>
        <QuizInfo />
      </div>
      <br />
      <div className='select'>
        <div className='select_category'>
          <Select
            size='large'
            placeholder='Select a Category'
            onChange={handleCategory}
            style={{ width: 240 }}
          >
            {Categories.map((Category) => (
              <Option key={Category.id} value={Category.id}>
                {Category.category}
              </Option>
            ))}
          </Select>
        </div>
        <div className='select_type'>
          <Select
            size='large'
            placeholder='Select Difficulty mode'
            onChange={handleType}
            style={{ width: 240 }}
          >
            {options.map((option) => (
              <Option key={option.id} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='start_button'>
        <Button
          size='large'
          type='primary'
          htmlType='submit'
          onClick={() => navigate("/mode")}

        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCategotyValue: (category) => {
      dispatch(categoryValue(category));
    },
    onModeValue: (mode) => {
      dispatch(typeValue(mode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);

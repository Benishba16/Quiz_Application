import React from "react";
import { Typography } from "antd";
import "./QuizInfo.css";

const { Title, Text } = Typography;

function QuizInfo() {
  return (
    <div className="quiz_total">
      <div className='quiz_title'>
        <Title>Quiz</Title>
      </div>
      <div className='quiz_text'>
        
        <Text>
          A quiz is a form of game or mind sport in which players attempt to
          answer questions correctly about a certain or variety of subjects.
        </Text>
      </div>
    </div>
  );
}

export default QuizInfo;

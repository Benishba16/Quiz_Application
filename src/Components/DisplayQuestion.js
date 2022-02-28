import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Typography, Space, Spin } from "antd";
import {
  attemptValue,
  questionIndex,
  scoreValue,
  setSelectedValues,
} from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import "./DisplayQuestion.css";

const { Title, Text } = Typography;

function DisplayQuestion(props) {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [select, setSelect] = useState(null);
  const [selectedValue, setSelectedValue] = useState([]);

  let answer;
  if (props.questions.length) {
    answer = props.questions[props.questionIndex].correct_answer;
    console.log(answer);
  }

  useEffect(() => {
    if (props.questions.length) {
      const questions = props.questions[props.questionIndex];
      console.log(questions);
      let answers = [...questions.incorrect_answers, questions.correct_answer];
      answers.sort(() => Math.random() - 0.5);
      setOptions(answers);
    }
  }, [props.questions.length, props.questionIndex]);

  const handleClick = (e) => {
    props.onAttemptValue(props.attempt);
    console.log("Attempt", props.attempt);
    setSelectedAnswer(true);
    // setSelect(e.target.textContent);
    if (e.target.textContent) {
      console.log(e.target.textContent);
      for (let i = 0; i < props.questions.length; i++) {
        selectedValue.push(e.target.textContent);
        break;
      }
      // setSelectedValue(selectedValue);
      // console.log(selectedValue);
      props.onSetSelectedValues(selectedValue)
    }
    // setSelectedValue(selectAns)
    if (e.target.textContent === answer) {
      props.onScoreValue(props.score);
      console.log(props.score);
      console.log("Clicked");
    }
    if (props.questionIndex + 1 < props.questions.length) {
      props.onQuestionIndex(props.questionIndex);
    } else {
      navigate("/score");
    }
  };

  const handleNext = () => {
    if (props.questionIndex + 1 < props.questions.length) {
      props.onQuestionIndex(props.questionIndex);
    } else {
      navigate("/score");
    }
  };
  return props.questions.length > 0 ? (
    <div>
        {console.log("Hi",selectedValue)}

      <Title className='title' style={{ color: "white" }}>
        Question {props.questionIndex + 1}
      </Title>
      <Text strong className='question' style={{ fontSize: 30 }}>
        {decode(props.questions[props.questionIndex].question)}
      </Text>
      <div>
        {options.map((option, id) => (
          <div className='button_div'>
            <Text
              strong
              style={{ fontSize: "20px", width: "100px", color: "white" }}
              key={id}
              onClick={handleClick}
              // className="button"
            >
              {decode(option)}
            </Text>
          </div>
        ))}
      </div>
      <div className='next_button'>
        <Button size='large' type='primary' onClick={handleNext}>
          Next
        </Button>
      </div>
      {/* {props.onSetSelectedValues(selectedValue)} */}
    </div>
  ) : (
    <div className='spin'>
      <Spin size='large' />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    questionIndex: state.questionIndex,
    questionIndex: state.questionIndex,
    score: state.score,
    attempt: state.attempt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionIndex: (index) => {
      dispatch(questionIndex(index));
    },
    onScoreValue: (score) => {
      dispatch(scoreValue(score));
    },
    onAttemptValue: (attempt) => {
      dispatch(attemptValue(attempt));
    },
    onSetSelectedValues: (values) => {
      dispatch(setSelectedValues(values));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuestion);

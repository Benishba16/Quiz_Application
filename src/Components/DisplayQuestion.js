import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Typography, Space } from "antd";
import { attemptValue, questionIndex, scoreValue } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import "./DisplayQuestion.css";

const { Title, Text } = Typography;

function DisplayQuestion(props) {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [select, setSelect] = useState(null);
  const [selctedValue, setSelectedValue] = useState([]);

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
    const selectAns = [];
    props.onAttemptValue(props.attempt)
    console.log("Attempt",props.attempt);
    setSelectedAnswer(true);
    setSelect(e.target.textContent);
    if(e.target.textContent){
      selectAns.push(e.target.textContent);
    }
    setSelectedValue(selectAns)
    console.log(selctedValue);
    if (e.target.textContent === answer) {
      props.onScoreValue(props.score);
      console.log(props.score);
    }
    // if(props.questionIndex + 1 < props.questions.length){
    // props.onQuestionIndex(props.questionIndex);
    // }
    // else{
    //   navigate("/score")
    // }
  };

  const handleNext = () => {
    if (props.questionIndex + 1 < props.questions.length) {
      props.onQuestionIndex(props.questionIndex);
    } else {
      navigate("/score");
    }
  };

  return props.questions.length > 0 ? (
    <div className='question'>
      <Card className='question_entire' hoverable style={{ height: "500px" }}>
        <Title className='question_title'>
          Question {props.questionIndex + 1}
        </Title>
        <div className='question_text'>
          <Text style={{ fontSize: 30 }}>
            {decode(props.questions[props.questionIndex].question)}
          </Text>
        </div>
        <div className='question_options'>
          {options.map((option, id) => (
            <div className='question_buttons'>
              <Space>
                <Button
                  style={{ fontSize: "15px" }}
                  key={id}
                  onClick={handleClick}
                >
                  {decode(option)}
                </Button>
              </Space>
            </div>
          ))}
        </div>
        <div className='next_button'>
          <Button size='large' type='primary' onClick={handleNext}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    questionIndex: state.questionIndex,
    questionIndex: state.questionIndex,
    score: state.score,
    attempt: state.attempt
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
      dispatch(attemptValue(attempt))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuestion);

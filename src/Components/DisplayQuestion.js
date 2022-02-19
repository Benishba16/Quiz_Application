import { useEffect, useState } from "react";
import {connect} from "react-redux";
import {Button, Card, Typography} from "antd";
import { questionIndex, scoreValue } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

const {Title, Text} = Typography; 

function DisplayQuestion(props) {

  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [select, setSelect] = useState(null);

  let answer;
  if(props.questions.length){
    answer = props.questions[props.questionIndex].correct_answer;
    console.log(answer);
  }

  useEffect(() => {
    if(props.questions.length){
    const questions = props.questions[props.questionIndex];
    console.log(questions);
    let answers = [...questions.incorrect_answers, questions.correct_answer];
    answers.sort(() => Math.random() - 0.5)
    setOptions(answers)
    }
  },[props.questions.length, props.questionIndex])

  const handleClick = (e) => {
    setSelectedAnswer(true)
    setSelect(e.target.textContent);
    if(e.target.textContent === answer){
      props.onScoreValue(props.score)
    }
    if(props.questionIndex + 1 < props.questions.length){
    props.onQuestionIndex(props.questionIndex);
    }
    else{
      navigate("/score")
    }
  }

  return props.questions.length > 0 ?  (
    <div>
      <div>
        <Title>Question {props.questionIndex + 1}</Title>
      </div>
      <div>
        <Text style={{fontSize: 35}}>{props.questions[props.questionIndex].question}</Text>
      </div>
      <div>
        {options.map((option,  id) => (
          <div>
          <Card key={id} style={{width: 500}}>
            <Button onClick={handleClick}>{option}</Button>
          </Card><br/>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

const mapStateToProps = state => {
    return{
        questions: state.questions,
        questionIndex: state.questionIndex,
        questionIndex: state.questionIndex,
        score: state.score
    }
}

const mapDispatchToProps = dispatch => {
  return{
    onQuestionIndex: (index) => {
      dispatch(questionIndex(index))
    },
    onScoreValue: (score) => {
      dispatch(scoreValue(score))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuestion)
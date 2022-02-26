import { useState } from "react";
import {connect} from "react-redux";
import {decode} from "html-entities";
import {Typography} from "antd";

const {Title, Text} = Typography

function Review(props) {
  const [questions, setQuestions] = useState([props.questions]);
  const [index, setIndex] = useState(props.questionIndex);
  console.log("Question & Index", questions[index]);

  return props.questions.length ? (
    <div>
        {console.log(props.questions[index].category)}
        {props.questions.map((ques) => (
          <div>
          <Title level={2} key={ques.correct_answer}>{decode(ques.question)}</Title>
          <Text style={{fontSize: 20}} strong type="success">Correct Answer: {decode(ques.correct_answer)}</Text>
          </div>
        ))}
    </div>
  ) : null
}

const mapStateToProps = state => {
    return{
        questionIndex: state.questionIndex,
        questions: state.questions
    }
}

export default connect(mapStateToProps)(Review)
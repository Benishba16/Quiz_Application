import { connect } from "react-redux";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { questionIndex, scoreValue } from "../Redux/actions";

const { Title } = Typography;

function Score(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(props);
    props.onQuestionIndex(-1);
    props.onScoreValue(-1);
    navigate("/question");
  };

  const handleHome = () => {
    props.onQuestionIndex(-1);
    props.onScoreValue(-1);
    navigate("/quiz")
  }
  return (
    <div>
      <Title>Your Score is {props.score}</Title>
      <div>
        {props.score > localStorage.getItem("HighestScore") &&
          localStorage.setItem("HighestScore", props.score)}
      </div>
      <div>
        <Button onClick={handleClick} type='primary'>
          Restart
        </Button>
      </div>
      <br />
      <div>
        <Button type='primary' onClick={handleHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    questionIndex: state.questionIndex,
    score: state.score,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);

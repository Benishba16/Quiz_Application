import { connect } from "react-redux";
import { Typography } from "antd";

const { Title } = Typography;

function Score(props) {
  return (
    <div>
      <Title>Your Score is {props.score}</Title>
      <div>
        {props.score > localStorage.getItem("HighestScore") &&
          localStorage.setItem("HighestScore", props.score)}
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

export default connect(mapStateToProps)(Score);

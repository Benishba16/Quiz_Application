import { connect } from "react-redux";
import { Button, Typography, Modal, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import { attemptValue, questionIndex, scoreValue } from "../Redux/actions";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import DisplayQuestion from "./DisplayQuestion";
import Review from "./Review";

const { Title, Text } = Typography;

function Score(props) {
  const [modal, setModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(props);
    props.onQuestionIndex(-1);
    props.onScoreValue(-1);
    props.onAttemptValue(-1);
    navigate("/question");
  };

  const handleHome = () => {
    props.onQuestionIndex(-1);
    props.onScoreValue(-1);
    props.onAttemptValue(-1);
    navigate("/quiz");
  };

  const handleReview = () => {
    setReviewModal(true);
    props.onQuestionIndex(-1);
    props.onScoreValue(-1);
  };
  return (
    <div>
      <Title>Score Board</Title>
      <div>
        <Button type='primary' onClick={() => setModal(true)}>
          Your Score
        </Button>
        <Modal
          title='Score Board'
          visible={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
        >
          <Title>Your Score is {props.score}</Title>
          {/* <Progress percent={props.score * 10 * props.questions.length}>
            {props.score}
          </Progress> */}
          <div>
            <Text style={{ fontSize: 17 }}>
              Total number of Questions - {props.questions.length}
            </Text>
            <br />
            <Text style={{ fontSize: 17 }}>
              Total number of Attempts - {props.attempt}
            </Text>
            <br />
            <Text style={{ fontSize: 17 }}>
              Number of <CloseOutlined /> Attempts -{" "}
              {props.questions.length - props.score}
            </Text>
          </div>
        </Modal>
      </div>
      <br />
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
      <div>
        <Button type='primary' onClick={handleReview}>
          Review
        </Button>
        <Modal
          title='Review'
          visible={reviewModal}
          onOk={() => setReviewModal(false)}
          onCancel={() => setReviewModal(false)}
        >
          <Review />
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    questionIndex: state.questionIndex,
    score: state.score,
    questions: state.questions,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);

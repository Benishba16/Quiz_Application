import { connect } from "react-redux";
import { Button, Typography, Modal, Progress, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { attemptValue, questionIndex, scoreValue } from "../Redux/actions";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import DisplayQuestion from "./DisplayQuestion";
import Review from "./Review";
import "./Score.css";

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
    props.onAttemptValue(0);
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
      <Card hoverable className="score_card">
      <div className="score_button">
            <Button size="large" type='primary' onClick={handleHome}>
              Back to Home
            </Button>
            </div>
          <div className="score_title">
          <Title>Your Score is {props.score}</Title>
          </div>
            <div className="score_text">
            <Text style={{ fontSize: 17 }}>
              Total number of Questions - {props.questions.length}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Total number of Attempts - {props.attempt}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Number of <CloseOutlined /> Attempts -
              {props.questions.length - props.score}
            </Text>
            </div>
            <div>
            <Button onClick={handleClick} type='primary'>
              Restart
            </Button>
            <Button type='primary' onClick={handleReview}>
              Review
            </Button>
            </div>
            <Modal
              title='Review'
              visible={reviewModal}
              onOk={() => setReviewModal(false)}
              onCancel={() => setReviewModal(false)}
            >
              <Review />
            </Modal>
      </Card>
      {/* <div>
        <Button type='primary' onClick={handleHome}>
          Back to Home
        </Button>
      </div> */}
        {props.score > localStorage.getItem("HighestScore") &&
          localStorage.setItem("HighestScore", props.score)}
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

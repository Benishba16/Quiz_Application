import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { questionValue } from "../Redux/actions";
import { Button, Typography, Image } from "antd";
import { useNavigate } from "react-router-dom";
import "./Questions.css";
const { Title, Text } = Typography;

function Questions(props) {
  const navigate = useNavigate();

  const category = props.category;
  const mode = props.mode;

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=3&category=${category}&difficulty=${mode}&type=multiple`
      )
      .then((response) => {
        console.log(response);
        props.onQuestionValue(response.data.results);
      });
  }, []);

  return (
    <div>
      <Title className="welcome_title" style={{color: "white", fontFamily: "'ZCOOL QingKe HuangYou', cursive", fontSize: 50}}>Quiz</Title>
      <div className="display_quiz">
      <div className="display_mode">
        <Text style={{ fontSize: 50 , fontFamily: "'Source Code Pro', monospace", color: "#1890ff"}} strong>
          Category : {props.category}
        </Text>
        <br/>
        <Text style={{ fontSize: 30 , fontFamily: "'Source Code Pro', monospace", color: "#1890ff"}} strong>
          Difficulty Mode : {props.mode}
        </Text>
        <div className="display_button">
        <Button size="large" type="primary" onClick={() => navigate("/question")}>Start Quiz</Button>
        </div>
        </div>
        <Image className="display_image" width={650} src="https://thumbs.dreamstime.com/b/quiz-word-notepaper-hand-human-117727336.jpg"/>
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
    onQuestionValue: (question) => {
      dispatch(questionValue(question));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

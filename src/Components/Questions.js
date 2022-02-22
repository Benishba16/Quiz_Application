import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { questionValue } from "../Redux/actions";
import DisplayQuestion from "../Components/DisplayQuestion";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
      <Title>Welcome To Online Quiz</Title>
      <div>
        <Text style={{ fontSize: 30 }} strong>
          Category : {props.category}
        </Text>
      </div>
      <div>
        <Text style={{ fontSize: 20 }} strong>
          Difficulty Mode : {props.mode}
        </Text>
      </div>
      <div>
        <Button type="primary" size="large" onClick={() => navigate("/question")}>Start Quiz</Button>
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

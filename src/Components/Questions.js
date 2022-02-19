import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {questionValue} from "../Redux/actions"
import DisplayQuestion from "../Components/DisplayQuestion";

function Questions(props) {
  const category = props.category;
  const mode = props.mode;

  useEffect(() => {
    axios.get(
      `https://opentdb.com/api.php?amount=3&category=${category}&difficulty=${mode}&type=multiple`
    )
    .then((response) => {
      console.log(response);
      props.onQuestionValue(response.data.results);
    })
  });

  return <div>
    <DisplayQuestion/>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    mode: state.mode,
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onQuestionValue: (question) => {
      dispatch(questionValue(question))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

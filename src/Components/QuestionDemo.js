import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import axios from "axios";

function QuestionDemo(props) {

  const [category, setCategory] = useState(props.category);
  console.log(category);

  const handleQuery = async () => {
    let api = `https://opentdb.com/api.php?amount=3&category=${category}&difficulty=easy&type=multiple`;

    await fetch(api)
    .then((res) => res.json())
    .then((response) => {
      // setQuestion(response.results)
      console.log(response);
    })
  }

  // useEffect(() => {
  //   const data = axios.get(
  //     `https://opentdb.com/api.php?amount=3&category=${props.category}&difficulty=${props.mode}&type=multiple`
  //   )
  //   console.log("Data",data);
  //     console.log(props.category)
  // });
  return <div>
    <h1>QuestionDemo</h1>
    <button onClick={handleQuery}>Start Quiz</button>
    {
      console.log("log",props.category, props.mode)
    }
  </div>;
}

const mapStateToProps = state => {
  return{
    category: state.category,
    mode: state.mode
  }
}

export default connect(mapStateToProps)(QuestionDemo);

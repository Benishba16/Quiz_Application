import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Typography } from "antd";
import "./Questions.css";

const { Title, Text } = Typography;


function Questions(props) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=3&category=${props.category}&difficulty=${props.mode}&type=multiple`
      )
      .then((res) => {
        console.log("Response", res.data.results);
        setValues(res.data.results);
      })
      .then((err) => {
        console.log("Error", err);
      });
  }, []);



  return (
    <div className='questions'>
      <div className='question_title'>
        <Title>Question {}/{}</Title>
      </div>
      <div className='question'>
        <Text style={{ fontSize: "25px" }}>
        </Text>
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

export default connect(mapStateToProps)(Questions);

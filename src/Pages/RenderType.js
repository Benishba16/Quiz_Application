import React from 'react';
import {connect} from "react-redux";

function RenderType(props) {
  return (
    <div>
        <h2>RenderType</h2>
        <div>
            {console.log(props.category)}
            {props.category}
        </div>
        <div>
        {console.log(props.mode)}
            {props.mode}</div>
    </div>
  )
}

const mapStateToProps = state => {
    return{
        category: state.category,
        mode: state.mode
    }
}

export default connect(mapStateToProps)(RenderType)
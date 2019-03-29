import React from "react";
import "../css/CodeSampleExplorer.css";

class CodeSampleExplorer extends React.Component {
  render() {
    // console.log("this.props.codeSampleList ", this.props.codeSampleList);
    return (
      <section className="explorer">
        {this.props.codeSampleList.map(elm => {
          return (
            <div key={elm.id} className="codeSampleItem">
              {this.props.currentCodeSampleId === elm.id ? (
                <span data-id={elm.id} className="active">
                  {elm.title}
                </span>
              ) : (
                <span
                  onClick={this.props.changeCodeSampleHandler}
                  data-id={elm.id}
                >
                  {elm.title}
                </span>
              )}
            </div>
          );
        })}
      </section>
    );
  }
}

export default CodeSampleExplorer;

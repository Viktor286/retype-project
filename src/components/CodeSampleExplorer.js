import React from "react";
import { connect } from "react-redux";
import "../css/CodeSampleExplorer.css";

class CodeSampleExplorer extends React.Component {
  render() {
    const {
      codeSamples,
      currentCodeSampleId,
      changeCodeSampleHandler
    } = this.props;

    const displayCodeSamples = codeSamples.map(
      ({ initialState: { currentCodeSample } }) => {
        const { id, title, contentLen } = currentCodeSample;
        const isCurrentCodeSample = currentCodeSampleId === id;
        return (
          <div key={id} className="codeSampleItem">
            {isCurrentCodeSample ? (
              <span className="active">
                {title}&nbsp;
                <span>[{contentLen}]</span>
              </span>
            ) : (
              <span onClick={e => changeCodeSampleHandler(e, id)}>
                {title}&nbsp;
                <span>[{contentLen}]</span>
              </span>
            )}
          </div>
        );
      }
    );

    return (
      <div>
        <div className="controls">
          <button
            className="prevCodeSample"
            onClick={e => this.controlsPrevHandler(e, currentCodeSampleId)}
          >
            Prev
          </button>
          <button
            className="resetCodeSample"
            onClick={e => this.controlsResetHandler(e, currentCodeSampleId)}
          >
            Reset
          </button>
          <button
            className="nextCodeSample"
            onClick={e => this.controlsNextHandler(e, currentCodeSampleId)}
          >
            Next
          </button>
        </div>
        <section className="explorer">{displayCodeSamples}</section>
      </div>
    );
  }

  controlsResetHandler = (e, currentCodeSampleId) => {
    e.preventDefault();
    this.props.changeCodeSampleHandler(e, currentCodeSampleId, true);
  };

  controlsPrevHandler = (e, currentCodeSampleId) => {
    const { codeSamples } = this.props;
    e.preventDefault();
    let targetId = "";
    for (let idx in codeSamples) {
      if (
        codeSamples[idx].activeState.currentCodeSample.id ===
        currentCodeSampleId
      ) {
        targetId =
          codeSamples[
            (parseInt(idx, 10) + codeSamples.length - 1) % codeSamples.length
          ].activeState.currentCodeSample.id;
      }
    }
    this.props.changeCodeSampleHandler(e, targetId);
  };

  controlsNextHandler = (e, currentCodeSampleId) => {
    e.preventDefault();
    const { codeSamples } = this.props;

    let targetId = "";
    for (let idx in codeSamples) {
      if (
        codeSamples[idx].activeState.currentCodeSample.id ===
        currentCodeSampleId
      ) {
        targetId =
          codeSamples[(parseInt(idx, 10) + 1) % codeSamples.length].activeState
            .currentCodeSample.id;
      }
    }
    this.props.changeCodeSampleHandler(e, targetId);
  };
}

const mapStateToProps = state => ({ codeSamples: state.codeSamples });

export default connect(mapStateToProps)(CodeSampleExplorer);

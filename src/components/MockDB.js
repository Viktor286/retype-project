import uuid from "uuid";

import html_form_collection from "../testData/html-form-collection";
import redux_101 from "../testData/redux-101";
import redux_102 from "../testData/redux-102";
import bfs_level_memo from "../testData/bfs-level-memo";

// temp global store (indexedDB in future)
class CodeSample {
  constructor({ title, content, mainCategory }) {
    this.title = title;
    this.content = content;
    this.mainCategory = mainCategory;
    this.createdAt = new Date().getTime();
    this.id = uuid();

    this.state = {
      cursorIndex: 0,
      stat: new Array(this.content.split("").length).fill(0),
      isComplete: false,
      keysLeft: 0,
      keysSuccess: 0,
      keysLeftPercent: 0,
      linesSuccess: 0,
      currentCodeSampleId: this.id,
      mainTextSample: this.content,
      mainTextSampleArr: this.content.split(""),
      keysAmount: this.content.split("").length
    };
  }
}

let codeSamplesDataBase = [
  new CodeSample({
    title: "HTML Form Collection",
    content: html_form_collection,
    mainCategory: "DOM API"
  }),
  new CodeSample({
    title: "Redux 101",
    content: redux_101,
    mainCategory: "Redux"
  }),
  new CodeSample({
    title: "Redux 102",
    content: redux_102,
    mainCategory: "Redux"
  }),
  new CodeSample({
    title: "BFS level memo",
    content: bfs_level_memo,
    mainCategory: "Binary Tries"
  })
];

export default codeSamplesDataBase;

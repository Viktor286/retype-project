import uuid from "uuid";

// temp global store (indexedDB in future)
import html_form_collection from "../testData/html-form-collection";
import redux_101 from "../testData/redux-101";
import redux_102 from "../testData/redux-102";
import bfs_level_memo from "../testData/bfs-level-memo";
import dom_list from "../testData/dom-list";
import new_node_event from "../testData/new-node-event";
import for_in_for from "../testData/for-in-for";
import max_profit_job_seq from "../testData/max-profit-job-seq";
import getters from "../testData/getters";

class CodeSample {
  constructor({ title, content, mainCategory }) {
    this.title = title;
    this.content = content;
    this.mainCategory = mainCategory;
    this.createdAt = new Date().getTime();
    this.id = uuid();

    const contentAsArray = this.content.split("");
    const contentLen = contentAsArray.length;

    this.initialState = {
      codeArea: {
        cursorIndex: 0
      },

      currentCodeSample: {
        id: this.id,
        content: this.content,
        contentAsArray,
        contentLen
      },

      characterCorrectness: {
        map: new Array(contentLen).fill(0),
        keysLeft: contentLen,
        keysSuccess: 0,
        keysLeftPercent: 0,
        isComplete: false
      }
    };

    this.state = JSON.parse(JSON.stringify(this.initialState));
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
    title: "DOM List",
    content: dom_list,
    mainCategory: "DOM API"
  }),
  new CodeSample({
    title: "New node event",
    content: new_node_event,
    mainCategory: "Node"
  }),
  new CodeSample({
    title: "Double For Loop",
    content: for_in_for,
    mainCategory: "JS Core"
  }),
  new CodeSample({
    title: "Max profit job seq",
    content: max_profit_job_seq,
    mainCategory: "Algorithms"
  }),
  new CodeSample({
    title: "Getters",
    content: getters,
    mainCategory: "JS Core"
  }),
  new CodeSample({
    title: "BFS level memo",
    content: bfs_level_memo,
    mainCategory: "Binary Tries"
  })
];

export default codeSamplesDataBase;

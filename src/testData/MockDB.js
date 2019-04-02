// import uuid from "uuid";
import shortid from "shortid";

// temp global store (indexedDB in future)
import html_form_collection from "./html-form-collection";
import redux_101 from "./redux-101";
import redux_102 from "./redux-102";
import bfs_level_memo from "./bfs-level-memo";
import dom_list from "./dom-list";
import new_node_event from "./new-node-event";
import for_in_for from "./for-in-for";
import max_profit_job_seq from "./max-profit-job-seq";
import getters from "./getters";
import redux_from_scratch from "./redux-from-scratch";

class CodeSample {
  constructor({ title, content, mainCategory }) {
    const createdAt = new Date().getTime();
    const id = shortid.generate();
    const contentAsArray = content.split("");
    const contentLen = contentAsArray.length;

    this.initialState = {
      codeArea: {
        cursorIndex: 0,
        timeCountingDelay: 0
      },

      currentCodeSample: {
        id,
        title,
        mainCategory,
        content,
        contentAsArray,
        contentLen,
        createdAt
      },

      characterCorrectness: {
        map: new Array(contentLen).fill(0),
        keysLeft: contentLen,
        keysSuccess: 0,
        keysLeftPercent: 0,
        isComplete: false,
        cpm: 0,
        timeCounted: 0
      },

      userStat: {
        currentCompletion: {
          cpm: 0,
          timeCounted: 0,
          backspaces: 0,
          mistakes: 0,
          timestamp: 0
        },
        completionsHistory: []
      }
    };

    this.activeState = JSON.parse(JSON.stringify(this.initialState));
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
    title: "Redux from scratch",
    content: redux_from_scratch,
    mainCategory: "Patterns"
  }),
  new CodeSample({
    title: "BFS level memo",
    content: bfs_level_memo,
    mainCategory: "Binary Tries"
  })
];

export default codeSamplesDataBase;

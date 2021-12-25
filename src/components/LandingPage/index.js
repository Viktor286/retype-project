import "./index.css";
import {svgLogo} from "../CodingAreaHeader/topIconIndex";

export default function LandingPage() {
  return <div className="CodeTrainerApp">
    <section className={"landingContent"}>
      <section>
        <div dangerouslySetInnerHTML={{__html: svgLogo}} className="main-app-logo"/>
        <h2>Github Retype
          <div className="mainCategory">
            speed code typing trainer
          </div>
        </h2>
      </section>

      {/*Keyboard cool image + code attributes*/}

      <section>
        <h2>Improve programming skills by typing code!</h2>
        <p>Code writing requires special kind of typing skill, a bit different from regular text typing.<br />
          In order to get comfortable and fast in coding it's important to practice the special characters flow of symbols like brackets, semicolon, math operators and others.<br />
          Typos and mistakes can significantly interrupt working process which decreases both dev speed and dev experience.</p>
        <p>The great way to achieve a good results is by retyping real-life code examples. Learn to write code faster mastering your keyboarding technique.<br />
          With a great code-typing skill you will get more freedom in creating your projects without paying attention cost to complex patterns of code syntax.<br />
        </p>
      </section>

      <section>
        <h2>Use "Github Retype" to exercise any open source code file from the largest repository in the world! <br />Python, Javascript, PHP, Java, C, C++ — all top programming languages.</h2>
        <p>Add "rt" or "retype" text after the "github" domain name before ".com" to get github file as code typing trainer session.</p>
        {/* eslint-disable no-script-url */}
        <p>Or use bookmarklet to easy switch between github and retype: <pre>{"javascript: window.location.href = window.location.href.replace(/github(retype)?.com/, function(match, s) {return s ? %27github.com%27 : %27githubretype.com%27})"}</pre></p>
        {/* cool image example */}
      </section>

      <section>
        <h2>Learn new programming languages, syntax and APIs quickly</h2>
        <p>The world has plenty of different code syntax, interfaces, special frameworks and sometimes you need to quickly switch gears between something like python's NumPy and javascript's React.</p>
        <p>Just a couple of exercise per day/week will help you to quickly adapt to a new programing language, interface or framework pattern.</p>
        <p>Example: i am rarely write SQL queries by hand but i don't want to forget complex JOINs constructions, so as part of typing training from time to time i write several SQL commands just to refresh my memory.<br />
        </p>
      </section>

      <section>
        <h2>Why this works?</h2>
        <p>Muscle memory, patterns pickup, peripheral vision training, concentration skill, semantic memory improving, discipline routine are among the many reasons.</p>
      </section>

      <section>
        <h2>Try speed code typing training examples</h2>
        <ul>
          <li><a href="TheAlgorithms/C/blob/master/leetcode/src/1.c">TheAlgorithms/C/blob/master/leetcode/src/1.c</a></li>
          <li><a href="TheAlgorithms/Go/blob/master/dynamic/fibonacci.go">TheAlgorithms/Go/blob/master/dynamic/fibonacci.go</a></li>
          <li><a href="facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js">facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js</a></li>
          <li><a href="numpy/numpy/blob/main/numpy/typing/_array_like.py">numpy/numpy/blob/main/numpy/typing/_array_like.py</a></li>
          <li><a href="/TheAlgorithms/PHP/blob/master/String/EditDistance.php">/TheAlgorithms/PHP/blob/master/String/EditDistance.php</a></li>
          <li><a href="AppFlowy-IO/appflowy/blob/main/backend/src/application.rs">AppFlowy-IO/appflowy/blob/main/backend/src/application.rs</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/Types.ts">Viktor286/code-samples/blob/master/src/Engineering/Types.ts</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/Combinatorics/Permutations_Lexicg_Order.ts">Long line Permutations_Lexicg_Order.ts</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/GnomeSort.js">(both comments js) TheAlgorithms/Javascript/blob/master/Sorts/GnomeSort.js</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/InsertionSort.js">(all comments js)TheAlgorithms/Javascript/blob/master/Sorts/InsertionSort.js</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts">Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/BucketSort.js">Long lines example</a></li>
          <li><a href="TheAlgorithms/Python/blob/master/cellular_automata/game_of_life.py">Python comments aren't working</a></li>
        </ul>
      </section>

      <section>
        <h2>Take advantage of typing routine</h2>
        <p>Use retyping exercise to switch your focus and attention during the day while gaining benefits of good code writing ability.</p>
        <p>Exercise repetition within day-or-two interval helps to increase the quality of sensory and procedural memory.</p>
      </section>

      <section>
        <h2>Discover Github</h2>
        <p>Github is awesome community to discover new ideas, people, approaches, trends. <br />Don't forget to checkout <a href="https://github.com/trending?since=weekly">trending repos and developers</a> out there.</p>
      </section>

      <section>
        <h2>Create your own typing playlist</h2>
        <p>Make your own training program as files in your github repository and have your own custom coding exercises.</p>
      </section>

      <section>
        <h2>Typing skill required!</h2>
        <p>If you are new in typing and if you want to learn how increase your level of touch typing, there is several great resources to start with: <a href="https://www.typing.com/" target="_blank" rel="noreferrer">one</a>, <a href="https://www.ratatype.com/learn/" target="_blank" rel="noreferrer">two</a>, <a href="https://www.keybr.com/" target="_blank" rel="noreferrer">three</a></p>
        <p>You also can use touch typing exercises from github repository.</p>
      </section>

    </section>
  </div>
}

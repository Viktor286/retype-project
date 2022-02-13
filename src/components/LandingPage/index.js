import "./index.css";
import {svgLogo} from "../CodingAreaHeader/topIconIndex";

export default function LandingPage() {
  return <div className="CodeTrainerApp">
    <section className={"landingContent"}>
      <section>
        <div dangerouslySetInnerHTML={{__html: svgLogo}} className="main-app-logo"/>
        <h2>Retype Project
          <div className="mainCategory">
            typing trainer for opensource
          </div>
        </h2>
      </section>

      {/*Keyboard cool image + code attributes*/}

      <section>
        <h2>Improve programming skills by retyping code</h2>
        <p>Code writing requires special kind of typing skill, a bit different from regular text typing.<br />
          In order to get comfortable and fast in coding it's important to practice the special characters flow of symbols like brackets, semicolons, math operators and others.<br />
          Typos and mistakes can significantly interrupt working process which decreases both dev speed and dev experience.</p>
        <p>The great way to achieve a good results is by retyping real-life code examples. Learn to write code faster mastering your keyboarding technique.<br />
          With a great code-typing skill you will get more freedom in creating your projects without paying attention cost to complex patterns of code syntax.<br />
        </p>
      </section>

      <section>
        <h2>Use "Retype Project" to exercise any open source code file from the largest repository in the world! <br />Python, Javascript, PHP, C, C++, Java — all top programming languages.</h2>
        <p>Add "rt" text after the "github" domain name before ".com" to get github file as code typing training session.</p>
        {/* eslint-disable no-script-url */}
        <p>Or use bookmarklet to easy switch between github and retype: </p><pre>{"javascript:(() => {let l = window.location; let h = l.host; let c = l.href; let rt = 'retypeproject.com'; let g = 'github.com'; \n l.href = h == rt ? c.replace(rt, g) : h == g ? c.replace(g, rt) : 'https://' + rt})();"}</pre>
        {/* cool image example */}
      </section>

      <section>
        <h2>Get in touch with new programming languages, syntax and APIs quickly</h2>
        <p>The world has plenty of different code syntax, interfaces, special frameworks and sometimes you need to quickly switch gears between something like python's NumPy and javascript's React.</p>
        <p>Just a couple of exercise per day/week will help you to quickly adapt to a new programing language, interface or framework pattern.</p>
        <p>Example: i am rarely write SQL queries by hand but i don't want to forget how to write complex JOINs constructions, so as part of my typing training routine from time to time i write several SQL commands just to refresh my memory.<br />
        </p>
      </section>

      <section>
        <h2>Why this works?</h2>
        <p>Muscle memory, patterns pickup, peripheral vision training, concentration skill, semantic memory improving, discipline routine — among the many reasons.</p>
      </section>

      <section>
        <h2>Try speed code typing training examples</h2>
        <ul>
          <li><a href="TheAlgorithms/C/blob/master/leetcode/src/1.c">TheAlgorithms/C/blob/master/leetcode/src/1.c</a></li>
          <li><a href="TheAlgorithms/Java/blob/master/src/main/java/com/thealgorithms/sorts/SlowSort.java">TheAlgorithms/Java/blob/master/src/main/java/com/thealgorithms/sorts/SlowSort.java</a></li>
          <li><a href="TheAlgorithms/Julia/blob/main/src/knapsack/dynamic_programming.jl">TheAlgorithms/Julia/blob/main/src/knapsack/dynamic_programming.jl</a></li>
          <li><a href="TheAlgorithms/Go/blob/master/dynamic/fibonacci.go">TheAlgorithms/Go/blob/master/dynamic/fibonacci.go</a></li>
          <li><a href="facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js">facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js</a></li>
          <li><a href="numpy/numpy/blob/main/numpy/typing/_array_like.py">numpy/numpy/blob/main/numpy/typing/_array_like.py</a></li>
          <li><a href="TheAlgorithms/PHP/blob/master/String/EditDistance.php">/TheAlgorithms/PHP/blob/master/String/EditDistance.php</a></li>
          <li><a href="AppFlowy-IO/AppFlowy-Server/blob/main/services/http_server/src/main.rs">AppFlowy-IO/AppFlowy-Server/blob/main/services/http_server/src/main.rs</a></li>
          <li><a href="TheAlgorithms/Rust/blob/master/src/general/hanoi.rs">TheAlgorithms/Rust/blob/master/src/general/hanoi.rs</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/Types.ts">Viktor286/code-samples/blob/master/src/Engineering/Types.ts</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/Combinatorics/Permutations_Lexicg_Order.ts">Long line Permutations_Lexicg_Order.ts</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/GnomeSort.js">TheAlgorithms/Javascript/blob/master/Sorts/GnomeSort.js</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/InsertionSort.js">TheAlgorithms/Javascript/blob/master/Sorts/InsertionSort.js</a></li>
          <li><a href="Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/02_PreOrder_Iterative.ts">Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/02_PreOrder_Iterative.ts</a></li>
          <li><a href="TheAlgorithms/Javascript/blob/master/Sorts/BucketSort.js">TheAlgorithms/Javascript/blob/master/Sorts/BucketSort.js</a></li>
          <li><a href="TheAlgorithms/Python/blob/master/cellular_automata/game_of_life.py">TheAlgorithms/Python/blob/master/cellular_automata/game_of_life.py</a></li>
          <li><a href="trekhleb/javascript-algorithms/blob/master/src/data-structures/queue/Queue.js">trekhleb/javascript-algorithms/blob/master/src/data-structures/queue/Queue.js</a></li>
          <li><a href="megadose/holehe/blob/master/holehe/instruments.py">megadose/holehe/blob/master/holehe/instruments.py</a></li>
        </ul>
      </section>

      <section>
        <h2>Take advantage of typing routine</h2>
        <p>Use retyping exercise to switch your focus and attention during the day. Fine motor skills exercises can help to take your mind off.</p>
        <p>Regular repetition within day-or-two interval helps to increase the quality of sensory and procedural memory.</p>
      </section>

      <section>
        <h2>Discover Github</h2>
        <p>Github is awesome community to discover new ideas, people, approaches, trends. <br />Don't forget to checkout <a href="https://github.com/trending?since=weekly">trending repos and developers</a> out there.</p>
      </section>

      <section>
        <h2>Create your own typing playlist</h2>
        <p>Make your own training program as collection of files in your github repository and have your own custom coding exercise set.</p>
        <p>If you're logged in then you can have access to unlicensed files from your repository.</p>
      </section>

      <section>
        <h2>Typing skill required!</h2>
        <p>If you are new in typing and if you want to learn how to increase your level of touch typing, there is several great resources to start with: <a href="https://www.typing.com/" target="_blank" rel="noreferrer">one</a>, <a href="https://www.ratatype.com/learn/" target="_blank" rel="noreferrer">two</a>, <a href="https://www.keybr.com/" target="_blank" rel="noreferrer">three</a></p>
        {/*<p>You also can use touch typing exercises from github repository.</p>*/}
      </section>

    </section>
  </div>
}

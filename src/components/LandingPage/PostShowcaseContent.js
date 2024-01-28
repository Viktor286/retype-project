import React from 'react';

export const PostShowcaseContent = () => {
  return (
    <>
      <section className="callout">
        <h2>Improve programming skills by retyping code</h2>
        <p>
          Code writing requires special kind of typing skill, a bit different from regular text typing.
          <br />
          In order to get comfortable and fast in coding it's important to practice the special characters
          flow of symbols like brackets, semicolons, math operators and others.
          <br />
          Typos and mistakes can significantly interrupt working process which decreases both dev speed and
          dev experience.
        </p>
        <p>
          The great way to achieve good results is retyping real-life code examples. Learn to write code
          faster mastering your keyboarding technique.
          <br />
          With a great code-typing skill you will get more freedom in creating your projects without paying
          attention the cost of complex code syntax patterns.
          <br />
        </p>
      </section>
      <section className="callout">
        <h2>
          Use "Retype Project" to exercise any open source code file from the largest repository in the world!{' '}
          <br />
          Python, Javascript, PHP, C, C++, Java — all top programming languages.
        </h2>
        <p>
          Add "rt" text after the "github" domain name before ".com" to get github file as code typing
          training session.
        </p>
        {/* eslint-disable no-script-url */}
        <p>Or use bookmarklet to easy switch between github and retype: </p>
        <pre>
          {
            "javascript:(() => {let l = window.location; let h = l.host; let c = l.href; let rt = 'retypeproject.com'; let g = 'github.com'; \n l.href = h == rt ? c.replace(rt, g) : h == g ? c.replace(g, rt) : 'https://' + rt})();"
          }
        </pre>
        {/* cool image example */}
      </section>

      <section className="callout">
        <h2>Get in touch with new programming languages, syntax and APIs quickly</h2>
        <p>
          The world has plenty of different code syntax, interfaces, special frameworks and sometimes you need
          to quickly switch gears between something like python's NumPy and javascript's React.
        </p>
        <p>
          Just a couple of exercise per day/week will help you to quickly adapt to a new programing language,
          interface or framework pattern.
        </p>
        <p>
          Example: i am rarely write SQL queries by hand but i don't want to forget how to write complex JOINs
          constructions, so as part of my typing training routine from time to time i write several SQL
          commands just to refresh my memory.
          <br />
        </p>
      </section>

      <section className="callout">
        <h2>Discover Github</h2>
        <p>
          Github is awesome community to discover new ideas, people, approaches, trends. <br />
          Don't forget to checkout{' '}
          <a href="https://github.com/trending?since=weekly">trending repos and developers</a> out there.
        </p>
      </section>

      <section className="callout">
        <h2>Create your own typing playlist</h2>
        <p>
          Make your own training program as collection of files in your github repository and have your own
          custom coding exercise set.
        </p>
        <p>If you're logged in then you can have access to unlicensed files from your repository.</p>
      </section>
    </>
  );
};

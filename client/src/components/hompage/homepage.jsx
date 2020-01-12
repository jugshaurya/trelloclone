import React from "react";
import { ReactComponent as MainImg } from "../../assets/mainimg.svg";
import { ReactComponent as MainImg2 } from "../../assets/mainimg2.svg";
import { ReactComponent as TeamImg } from "../../assets/team.svg";
import "./homepage.styles.scss";
const Homepage = props => {
  return (
    <>
      <section id="main-section">
        <div className="container pb-3 text-white">
          <div className="row  text-center text-md-left">
            <div className="col-lg-5">
              <h1 className="title-from-trello">
                Trello lets you work more collaboratively and get more done.
              </h1>
              <p className="title-from-trello-lead">
                Trello’s boards, lists, and cards enable you to organize and
                prioritize your projects in a fun, flexible, and rewarding way.
              </p>
              <button
                type="button"
                onClick={() => props.history.push("/boards")}
                className="btn btn-success bg-white btn-lg px-3"
              >
                View All Your Boards
              </button>
            </div>

            <div className="main-img col-lg-6 offset-lg-1 mt-sm-3 mt-md-1">
              <MainImg2 />
            </div>
          </div>
        </div>
      </section>

      <section id="second-section">
        <div className="container py-3">
          <div className="row align-items-center text-center text-md-left">
            <article className="article-left col-md-6 ">
              <div className="text-center text-md-left">
                <TeamImg />
                <h3 className="mt-3">Work with any team</h3>
                <p>
                  Whether it’s for work, a side project or even the next family
                  vacation, Trello helps your team stay organized.
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() => props.history.push("/signup")}
                    className="btn btn-secondary px-3"
                  >
                    <span role="img" aria-labelledby="emoji">
                      📌
                    </span>
                    Create Account
                    <span role="img" aria-labelledby="emoji">
                      🏁
                    </span>
                  </button>
                </p>
              </div>
            </article>
            <article className="article-right col-md-5 offset-1">
              <div className="text-center text-md-left">
                <MainImg />
                <h3 className="mt-3">Information at a glance</h3>
                <p>
                  Dive into the details by adding descriptions, attachments,
                  labels, and more directly to Trello cards. Collaborate on
                  projects from beginning to end.
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() => props.history.push("/boards")}
                    className="btn btn-secondary px-3"
                  >
                    <span role="img" aria-labelledby="emoji">
                      📌
                    </span>
                    Start Working
                    <span role="img" aria-labelledby="emoji">
                      📑
                    </span>
                  </button>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="third-section">
        <div className="container">
          <div className="px-3 pb-3 text-left">
            <h3 className="mb-4 text-center">What is Trello ? </h3>
            <p>
              <span role="img" aria-labelledby="emoji">
                💎
              </span>
              Trello is a web-based <em>Kanban-style</em> list-making
              application.
            </p>
            <p>
              <span role="img" aria-labelledby="emoji">
                💎
              </span>
              It is an easy way to clean out those cards gathering dust on your
              board.
            </p>
            <p>
              <span role="img" aria-labelledby="emoji">
                💎
              </span>
              Resolves that constant, nagging feeling of trying to fix and
              manage your external environment!
            </p>
          </div>
        </div>
      </section>

      <section id="fourth-section" className="container text-center">
        <div className="row align-items-center text-center">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h2>Welcome to Trello Clone </h2>
            <p>
              Sign up and see what <strong>shaurya</strong> has added in order
              to clone the million people used Trello as one of the personal
              project!.
            </p>
            <a href="/signin" className="btn btn-success bg-white px-3">
              Have a Look!
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;

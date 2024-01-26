import BlogController from "./BlogController";
import blogPageImg from "../assets/img/blogPageImg.png";

export default function Blogs({ isLogin }) {
    return (
        <>

            <div className="title-content max-width-1 ">
                <div className="title-content-left">
                    <h1 className="blog-title-welcome">Welcome to Blogs!!</h1>
                    <p>Create Your Own Blogs By Logging In!!!</p>
                    <p className="thoughts">I think of us as journalists; the medium we work in is blogging. <br />--Joshua Marshall</p>
                </div>
                <div className="title-content-right">
                    <img src={blogPageImg} alt="home.png" />
                </div>
            </div>
            <BlogController isLogin={isLogin} />
            <div className="blog-articles footer-fix max-width-1">
                <h2 className="color2">Featured Articles</h2>
                {/* 1  */}
                <article className="blog-article">
                    <div className="article-header">
                        <span className="article-title">
                            How to Become a Front-End Developer
                        </span>
                        <span className="article-right">
                            <div className="article-author">@Anup Dhoble</div>
                            <div className="article-time">24/11/2003</div>
                        </span>
                    </div>
                    <div className="hr-nav m-auto"><hr /></div>
                    <div className="article-content">
                        <p>Websites these days have various different visual and interactive elements that make them appealing and easy to use. If you’re a creative thinker, and looking to make your mark in the tech world, then a career as a front-end developer could be a great option for you. Building websites from scratch and seeing your ideas brought to life is always rewarding—and you’ll be helping businesses to connect with their customers in a powerful and dynamic way.</p>

                        <p>As the name suggests, front-end developers interact with the front-end or the client-side of a website. There’s another team of coders that work on the website’s functionality with the database and server-side; they’re known as back-end developers. Front-end developers also use back-end data to create a user-facing functionality. Everything that we see on our website screens, everything we click and touch, is created through markup languages, designs, scripts, and frameworks that have been put together by a front-end developer.</p>

                        <p>This article runs through the typical role of front-end developer, the best ways to learn the trade and tips for carving out a successful career in this fast-moving industry. If you want to find out how to become a front-end developer, then look no further.</p>
                    </div>
                </article>

            </div>
        </>
    )
};

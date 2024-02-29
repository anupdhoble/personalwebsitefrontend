import React, { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { auth } from '../firebaseConfig';
import blogPageImg from "../assets/img/blogPageImg.png";

const Blogs = ({ isLogin }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const handleDelete = async (blogId) => { // Receive blogId as a parameter
        try {
            const url = `https://personalwebsitebackend.onrender.com/blogs/remove/${blogId}`; // Use blogId in the URL
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchAllBlogs();
            } else {
                throw new Error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }

    const fetchAllBlogs = async () => {
        try {
            const url = "https://personalwebsitebackend.onrender.com/blogs/getAll";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                const formattedBlogs = data.map(blog => ({
                    ...blog,
                    createdAt: new Date(blog.createdAt).toLocaleDateString()
                })).reverse();
                setBlogs(formattedBlogs);
            } else {
                throw new Error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    return (
        <>
            <div className="title-content max-width-1">
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
                {blogs.map((blog) => (
                    <article key={blog._id} className="blog-article">
                        <div className="article-header">
                            <span className="article-title">{blog.title}</span>
                            {isLogin && auth.currentUser.displayName === blog.author && (
                                <span><button onClick={() => handleDelete(blog._id)}>🗑️</button></span> // Pass blogId to handleDelete
                            )}
                            <span className="article-right">
                                <div className="article-author">@{blog.author}</div>
                                <div className="article-time">{blog.createdAt}</div>
                            </span>
                        </div>
                        <div className="hr-nav m-auto"><hr /></div>
                        <div className="article-content">
                            <p>{blog.content}</p>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default Blogs;

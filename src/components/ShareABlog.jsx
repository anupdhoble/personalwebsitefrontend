import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../styles/blogs.css";



export default function ShareABlog() {
    const [blog, setBlog] = useState(null);
    const { blogid } = useParams();
    const fetchBlog = async () => {
        try {
            const url = `https://personalwebsitebackend.onrender.com/blogs/get/${blogid}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            });

            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                throw new Error("Failed to fetch blog");

            }



        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    }
    useEffect(() => {
        fetchBlog();
    });
    document.title = blog ? blog.title : "Website Title";

    return (
        <div className='footer-fix'>
            {blog && (
                <div className="blog-articles footer-fix max-width-1">
                    <article className="blog-article">
                        <div className="article-header">
                            <span className="article-title">{blog.title}</span>
                            <span className="article-right">
                                <div className="article-author">@{blog.author}</div>
                                <div className="article-time">{blog.createdAt}</div>
                            </span>
                        </div>
                        <div className="hr-nav m-auto"><hr /></div>
                        <div className="article-content">

                            <p>
                                {blog.imgUrl && <img className="blogImage" src={blog.imgUrl} alt="blog" />}
                                {blog.content}

                            </p>
                        </div>
                    </article >
                </div>
            )}
        </div>
    )
}

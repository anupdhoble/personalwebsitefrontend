import React, { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { auth, storage } from '../firebaseConfig';
import blogPageImg from "../assets/img/blogPageImg.png";
import { ref, deleteObject } from "firebase/storage";
import { HashLoader , MoonLoader} from "react-spinners";
import likeicon from "../assets/img/like.png";
import commenticon from "../assets/img/comment.png";
import shareicon from "../assets/img/share.png";
import send from "../assets/img/send.png";
import aiLogo from "../assets/img/ailogo.gif";
import geminiLogo from "../assets/img/geminiAi.png";



const ax="V7wqF6pkfSdjoPEtU";
const Blogs = ({ isLogin, showNotification }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState(""); // State to store comment
    const [commentVisibility, setCommentVisibility] = useState({});// State to track comment visibility
    const [blogcomments, setBlogcomments] = useState({});// State to store comments for each blog
    const [sendcommentloader, setSendcommentloader] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCommentVisibility({});
        setComment("");
        setBlogcomments({});
        fetchAllBlogs();
        
    }, []);
    

    //for share button last update Dt: 18-7-2021
    //Note for future : find how to share img with the link  
    function shareABlog(blogtitle, blogauthor,blogid) {
        // Get the current URL
        var blogurl = `/shareblog/${blogid}`;

        // Check if the Web Share API is supported by the browser
        if (navigator.share) {
            // Use the Web Share API to share the current URL
            navigator.share({
                title: "Blog: " + blogtitle + " || By: " + blogauthor,
                url: blogurl
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support the Web Share API
            alert('Your browser does not support the share functionality. You can manually copy the URL.');
        }
    }


    const handleDelete = async (blogId, blogImgUrl, imgRefToFirebase) => { // Receive blogId as a parameter
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                // showNotification("Deleting Blog..","info");
                const url = `https://personalwebsitebackend.onrender.com/blogs/remove/${blogId}`; // Use blogId in the URL
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // showNotification("Blog deleted successfully","success");
                    console.log("Blog deleted, cleaning up resources..");
                    if (blogImgUrl) {

                        const storageRef = ref(storage);
                        deleteObject(ref(storageRef, imgRefToFirebase)).then(() => {
                            console.log("Previous image deleted");
                        }).catch((error) => {
                            // showNotification("Blog deletion failed","error");
                            console.error("Error deleting previous image:", error);
                        });
                    }

                    fetchAllBlogs();
                } else {
                    // showNotification("Blog deletion failed","error");
                    throw new Error("Failed to delete blog");
                }
            } catch (error) {
                // showNotification("Blog deletion failed","error");
                console.error("Error deleting blog:", error);
            }
        }
    }

    const fetchAllBlogs = async () => {
        // fetchDelayMsg is used to show a notification if the server is taking too long to respond
        const fetchDelayMsg = setTimeout(() => {
            showNotification("Please wait server is rolling back up, it was in power saving mode.", "info",10000);
        }, 5000);
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
                
                // Initialize commentVisibility state object with all blog IDs
                const initialCommentVisibility={}
                formattedBlogs.forEach(blog=>{
                    initialCommentVisibility[blog._id]=false;
                });
                
                setCommentVisibility(initialCommentVisibility);

                
                setLoading(false);
                setBlogs(formattedBlogs);
            } else {
                throw new Error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }finally {
        // Clear the timeout only if it hasn't been cleared already
        if (fetchDelayMsg) {
            clearTimeout(fetchDelayMsg);
        }}
    }

    const fetchblogcomments = async(blogid)=>{
        try {
            const url = `https://personalwebsitebackend.onrender.com/comments/get/${blogid}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBlogcomments(prevState=>({
                    ...prevState,
                    [blogid]:data
                }));
                console.log(blogcomments);
            } else {
                throw new Error("Failed to fetch comments");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    const toggleCommentVIsibility=async(blogid)=>{
        setCommentVisibility(prevState=>({
            ...prevState,
            [blogid]:!prevState[blogid] // Toggle visibility for the clicked blog
        }));

        // Fetch comments for the blog if not already fetched
        await fetchblogcomments(blogid);
        
        
        
    }

    const handlecomment = (e) => {
        setComment(e.target.value);
    }

    const sendcomment = async(blogid) => {
        if(auth.currentUser===undefined || auth.currentUser===null){
            showNotification("Please login to comment","error");
            return;
        }else{
            if(comment!=="" && comment!==null){
                try {
                    setSendcommentloader(true);
                    const url="https://personalwebsitebackend.onrender.com/comments/create";
                    const response = await fetch(url,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            uid:auth.currentUser.uid,
                            commenter:auth.currentUser.displayName,
                            blogid:blogid,
                            content:comment
                        })
                    });
                    setComment("");
                    if(response.ok){
                        console.log("Comment sent successfully");
                        await fetchblogcomments(blogid);
                    }
                    setSendcommentloader(false);
                } catch (error) {
                    setSendcommentloader(false);
                    console.error("Error sending comment:", error);
                }
                setSendcommentloader(false);
            }else{
                console.log("Comment can't be empty");
            }
        }
    }
    const deletecomment = async(blogid,commentid) => {
        try {
            const url=`https://personalwebsitebackend.onrender.com/comments/delete/${commentid}`;
            const response = await fetch(url,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.ok){
                console.log("Comment deleted successfully");
                fetchblogcomments(blogid);
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
        <>
            {auth.currentUser && auth.currentUser.email === "anupdhoble15@gmail.com" && <div className="admin-panel"><h1>Admin Account</h1><h3>All changes made are recorded as done by admin</h3></div>}
            <div className="announcement title-content max-width-1">
                <img src={aiLogo} alt="ai" width="75px" style={{borderRadius : '10px'}}/>
                <div>
                    New !! Presenting ReWrite AI , Gemini 1.5 Flash powered writing assistance . Login and create your AI-assisted blog today! !!
                </div>
                <img id="geminiLogo"src={geminiLogo} alt="gemini" width="150px"/>

            </div>
            <div className="title-content max-width-1">
                <div className="title-content-left">
                    <h1 className="blog-title-welcome">Welcome to TechTrendTalks!!</h1>
                    <p>Stay Ahead of the Curve: Dive into the Latest Tech Trends with TechTrend Talks!!!</p>
                    <p>Login Now and start creating your blogs!!</p>
                    <p className="thoughts">I think of us as journalists; the medium we work in is blogging. <br />--Joshua Marshall</p>
                </div>
                <div className="title-content-right">
                    <img src={blogPageImg} alt="home.png" />
                </div>
            </div>
            <BlogController isLogin={isLogin} />
            {/* <h1>Blogging Services is down for routine maintenance🪛🪛</h1> */}
            <div className="blog-articles footer-fix max-width-1">
                <h2 className="color2">Featured Articles</h2>
                {loading && <div className="HashSpinner" ><HashLoader color="#05386B" /></div>}
                {blogs.map((blog) => (
                    <article key={blog._id} className="blog-article">
                        <div className="article-header">
                            <span className="article-title">{blog.title}</span>
                            {auth.currentUser && isLogin && ((auth.currentUser.uid === blog.uid)||(auth.currentUser.email === "anupdhoble15@gmail.com")) && (
                                <span><button onClick={() => handleDelete(blog._id, blog.imgUrl, blog.imgRefToFirebase)}>🗑️</button></span> // Pass blogId to handleDelete
                            )}
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
                        <div className="socialpanel">
                            <img className="likeicon" src={likeicon} alt="like" />
                            {/* <div className="likecount">{blog.likecount}</div> */}
                            <img className="commenticon" onClick={()=>{toggleCommentVIsibility(blog._id)}} src={commenticon} alt="comment" />
                            {/* <div className="commentcount">{}</div> */}
                            <img className="shareicon" src={shareicon} onClick={() => { shareABlog(blog.title, blog.author,blog._id) }} alt="share" />
                        </div>
                        <div className={`commentarea ${commentVisibility[blog._id] ? 'commentvisible' : ''}`}>
                            <div className="comments">
                                {blogcomments[blog._id] && blogcomments[blog._id].map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <span className="commenter">{`${comment.commenter} : ${comment.content}`}</span>
                                        {isLogin && auth.currentUser && ((auth.currentUser.uid === comment.uid) || (auth.currentUser.email==="anupdhoble15@gmail.com")) && 
                                            <span className="deletecomment" onClick={()=>{deletecomment(blog._id,comment._id)}}>🗑️</span>
                                        }
                                    </div>
                                ))}
                                {(!(blogcomments[blog._id]) || blogcomments[blog._id].length===0) && <div>Be First to comment on this blog...</div>}
                            </div>
                            <div className="postcomment">

                                <input type="text" className="commentinput" value={comment} 
                               onChange={handlecomment} onKeyDown={(e)=>{if(e.key==='Enter'){sendcomment(blog._id)}}} placeholder="Write a comment..." />
                                {!sendcommentloader &&
                                    <img src={send}  onClick={()=>{sendcomment(blog._id)}} alt="send" />
                                }
                                {sendcommentloader &&
                                    <div className="sendcommentloader"><MoonLoader size={20} color="#05386B" /></div>
                                }
                            </div>
                        </div>
                    </article>

                ))}
            </div>
        </>
    );
};
export const m = ax;
export default Blogs;

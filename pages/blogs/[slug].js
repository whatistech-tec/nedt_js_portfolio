// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { Children, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";

const BlogPage = () => {

    const router = useRouter();

    const {slug} = router.query;

    const {alldata} = useFetchData('/api/blogs');

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }

    const [blogData, setBlogData] = useState({blog: {}, comments: []})
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '',
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageOk, setMassageOk] = useState('');

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBlogData = async () =>{
            if (slug){
                try{
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setBlogData(response.data);
                    setLoading(false);
                }catch(error){
                    setError('Failed to fetch blog data. Please try again later!')
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
    }, [slug])
   
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try{ 
            const response = await axios.post(`/api/blogs${slug}`, newComment);

            if (newComment.parent){
                setBlogData(prevData =>{

                    const updateComments = prevData.comments.map(comment => {
                        if (comment._id === newComment.parent){
                            return{
                                ...comment,
                                children: [...comment.children, response.data]
                            }
                        }else if (comment.children && comment.children.length > 0){
                            return {
                                ...comment,
                                children: updateChildrenComments(comment.children, newComment.parent, response.data)
                            };
                        }
                        return comment;
                    });
                    return {
                        ...prevData,
                        comments: updateComments
                    }
                    
                })
            }else{
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments]
                }))
            }   
            setMassageOk(' Comment posted successifully');
            setTimeout(() => {
                setMassageOk('')
            }, 5000);
            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: '',
            })
        }catch(error){
            setMessageOk(' Failed to post comment')
            setTimeout(() => {
                setMessageOk('')
            },5000);
        }
    }

    const replyFormRef = useRef(null);

    const handleReply = (parentCommentId, parentName) => {
        setNewComment({
            ...newComment,
            parent:parentCommentId,
            parentName: parentName,
            maincomment: false,
        })
        if (replyFormRef.current){
            replyFormRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    const handleRemoveReply = () => {
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,
            maincomment: true,
        })
    }

    const updateChildrenComments = (comments, parentId, newComment) =>{
        return comments.map(comment =>{
            if (comment._id === parentId){
                return {
                    ...comment,
                    children: [...comment.children, newComment]
                }
            }else if (comment.children && comment.children.length > 0){
                return {
                    ...comment, 
                    children: updateChildrenComments(comment.children, parentId, newComment)
                }
            }
            return comment;
        })
    }

    if (loading) {
        return <div className="flex flex-center wh_100"><Spinner/></div>
    }

    if (error){
        return <p>Error: {error}</p>
    }

    const createdAtDate = blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null;

    const formatDate = (date) => {
        if (!date || isNaN(date)){
        return '';
        }
        const options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour12: 'true'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    
    
    const blogurl = `http://localhost:3000/blogs/${slug}`;
    const handleCopyUrl = (url) =>{
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);

        },3000);
        
    }

    const Code = ({node, inline, className, children, ...props}) =>{
        const match = /language.(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () =>{
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            },3000)
        }
        if (inline) {
            return <code>{children}</code>
        }else if (match){
            return(
                <div style={{position: 'relative'}}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{style: {padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap'}}}
                    >
                        {String(children).replace(/\n$/,'')}
                    </SyntaxHighlighter>
                    <button onClick={handleCopy} style={{position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px'}}>
                        {copied ? 'Copied' : 'Copy code'}
                    </button>
                </div>
            )
        }else{
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            )
        }
    }
      

    const renderComments = (comments) => {
        if (!comments){
            return null;
        }
        const commentMap = new Map();
        comments.forEach(comment => {
            if (comment.maincomment) {
                commentMap.set(comment._id, []);
            }
        })
        comments.forEach(comment =>{
            if (!comment.maincomment && comment.parent){
                if (commentMap.has(comment.parent)){
                    commentMap.get(comment.parent).push(comment);
                }
            }
        });
        return comments.filter(comment => comment.maincomment).map(parentComment =>{
            <div className="blogcomment" key={parentComment._id}>

                <h3>{parentComment.name} <span>{new Date(parentComment.createdAt).toLocaleString()}</span></h3>
                <h4>Topic: <span>{parentComment.title}</span></h4>
                <p>{parentComment.contentpera}</p>
                <button onClick={() => handleReply(parentComment._id, parentComment.name)}>Reply</button>
                {parentComment.parent && (
                    <span className="repliedto">Replied to {parentComment.parentName}</span>
                )}

                <div className="children-comments">
                    {commentMap.get(parentComment._id).map(childComment =>(
                        <div className="child-comment" key={childComment._id}>
                            <h3>{childComment.name}<span>{new Date(parentComment.createdAt).toLocaleString()}</span></h3>
                            <span>Replied to {childComment.parentName}</span>
                            <h4>Topic: <span>{childComment.title}</span></h4>
                            <p>{childComment.contentpera}</p>
                        </div>
                    ))}
                </div>
            </div>
        })
    }

    return (
        <>
        <Head>
            <title>{slug}</title>
        </Head>
        <div>
        {blogData && (
            <div className="blogslugpage">
                <div className="container">
                    <div className="blogslugpagecont">
                        <div className="leftsitedetails">
                            <div className="leftbloginfoimg">
                                <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData && blogData.title}/>
                            </div>
                            <div className="slugblogininfopub">
                                <div className="flex gap-2">
                                    <div className="adminslug">
                                        <img src='/img/dp.jpg' alt=""/>
                                        <span>By Hesborn Nyang'ara</span>
                                    </div>
                                    <div className="adminslug">
                                        <SlCalender/>
                                        <span>{formatDate(createdAtDate)}</span>
                                    </div>
                                    <div className="adminslug">
                                        <CiRead/>
                                        <span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
                                    </div>
                                </div>
                                <div className="shareblogslug">
                                    <div>
                                        <div title="Copy URL" onClick={() => handleCopyUrl(blogurl)} style={{cursor: 'pointer'}}>
                                            <BsCopy/> <span>{copied ? 'Copied!' : ''}</span>
                                        </div>
                                        <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                            <RiFacebookFill/>
                                        </a>
                                        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this blog post:' + blogurl)}`} rel="noopener noreferrer">
                                            <FaTwitter/>
                                        </a>
                                        <a target="_blank" href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                            <RiWhatsappFill/>
                                        </a>
                                        <a target="_blank" href={`https://www.linkedin.com/sharing/share.offsite/?url${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                            <BiLogoLinkedin/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h1>{blogData.blog.title}</h1>
                            {loading ? <Spinner/> : <div className="blogcontent">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code: Code
                                        }}

                                    >
                                        {blogData.blog.description}
                                    </ReactMarkdown>
                                </div>}

                                <div className="blogslugtags">
                                    <div className="blogstegs">
                                        <h2>Tags:</h2>
                                        <div className="flex flex-wrap gap-1">
                                            {blogData && blogData.blog.tags.map((cat) => {
                                                return <span key={cat}>{cat}</span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="blogusecomments">
                                    <h2>Comments</h2>
                                    {renderComments(blogData.comments)}
                                </div>
                                <div className="blogslugcomments" ref={replyFormRef}>
                                    {newComment.parentName && (
                                        <h2>Leave a Reply to <span className="parentname">{newComment.parentName}</span><button onClick={handleRemoveReply} className="removereplybtn">Remove Reply</button></h2>
                                    )}
                                    
                                    {!newComment.parentName && (
                                        <h2>Leave a Reply</h2>
                                    )}
                                    
                                    <p>Your email address will not be published. Requirefiels are marked * </p>
                                    <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                        <div className="nameemailComment">
                                            <input 
                                                type="text" 
                                                placeholder="Enter Name"
                                                value={newComment.name}
                                                onChange={(e) => setNewComment({...newComment, name:e.target.value})}
                                            />
                                            <input
                                                type="email" 
                                                placeholder="Enter Email"
                                                value={newComment.email}
                                                onChange={(e) => setNewComment({...newComment, email:e.target.value})}
                                            />
                                        </div>
                                        <input
                                            type="text" 
                                            placeholder="Enter title"
                                            value={newComment.title}
                                            onChange={(e) => setNewComment({...newComment, title:e.target.value})}
                                        />
                                        <textarea 
                                            name="" 
                                            rows={4} 
                                            placeholder="Enter Your Comments" 
                                            id="textcomments"
                                            value={newComment.contentpera}
                                            onChange={(e) => setNewComment({...newComment, contentpera:e.target.value})}
                                        ></textarea>
                                        <div className="flex gap-2">
                                            <button type="submit">Post Comment</button>
                                            <p>{messageOk}</p>
                                        </div>
                                    </form>
                                </div>

                        </div>
                        <div className="rightsitedetails">
                            <div className="rightslugsearchbar">
                                <input onClick={handleSearchOpen} type="text" placeholder="Search..."/>
                                <button><FiSearch/></button>
                            </div>
                            <div className="rightslugcategory">
                                <h2>CATEGORIES</h2>
                                <ul>
                                    <Link href={'/blogs/category/Next JS'}><li>Next JS <span>({alldata.filter(ab => ab.blogcategory[0] === 'Next JS').length})</span></li></Link>
                                    <Link href={'/blogs/category/Digital Marketing'}><li>Digital Marketing <span>({alldata.filter(ab => ab.blogcategory[0] === 'Digital Marketing').length})</span></li></Link>
                                    <Link href={'/blogs/category/React'}><li>React <span>({alldata.filter(ab => ab.blogcategory[0] === 'React').length})</span></li></Link>
                                    <Link href={'/blogs/category/CSS'}><li>CSS <span>({alldata.filter(ab => ab.blogcategory[0] === 'CSS').length})</span></li></Link>
                                    <Link href={'/blogs/category/Django'}><li>Django <span>({alldata.filter(ab => ab.blogcategory[0] === 'Django').length})</span></li></Link>
                                </ul>
                            </div>
                            <div className="rightrecentpost">
                                <h2>RECENT POSTS</h2>
                                {alldata.slice(0, 3).map((blog) => {
                                    return <Link key={blog._id} href={`/blogs/${blog.slug}`} className="rightrecentp">
                                        <img src={blog.images[0]} alt=""/>
                                        <div>
                                            <h3>{blog.title}</h3>
                                            <h4 className="mt-1">
                                                {blog.tags.map(( cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </h4>
                                        </div>
                                    </Link>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {searchInput ? <Blogsearch cls={handleSearchClose}/> : null}
            </div>
        )}
        </div>
           
        </>
    );
};

export default BlogPage;

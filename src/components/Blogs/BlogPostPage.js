import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';

import { getBlogBySlug, getBlogs, addComment, addReplyToComment } from '../../services/api';

const formatPostDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric'
        });
    } catch (e) { return dateString; }
};
const formatCommentDate = (dateString) => { 
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
             weekday: 'short', month: 'short', day: 'numeric'
        });
    } catch (e) { return dateString; }
};

function BlogPostPage() {
    const messageTimeoutRef = useRef(null);
    const replyMessageTimeoutRef = useRef(null); 

    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentEmail, setCommentEmail] = useState(''); 
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

    const [replyingToCommentId, setReplyingToCommentId] = useState(null); 
    const [replyAuthor, setReplyAuthor] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);
    const [replySubmitStatus, setReplySubmitStatus] = useState({ success: null, message: '', commentId: null });


    const [allBlogs, setAllBlogs] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const [relatedError, setRelatedError] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [slug]);

    useEffect(() => {
        if (!slug) return;

        const fetchBlogData = async () => {
            setLoading(true);
            setRelatedLoading(true);
            setError(null);
            setRelatedError(null);
            setSubmitStatus({ success: null, message: '' });
            setReplySubmitStatus({ success: null, message: '', commentId: null }); 

            try {
                const [fetchedBlog, fetchedAllBlogs] = await Promise.all([
                    getBlogBySlug(slug),
                    getBlogs()
                ]);
                setBlog(fetchedBlog);
                setAllBlogs(fetchedAllBlogs);

            } catch (err) {
                console.error(`Error fetching blog data for slug ${slug}:`, err);
                if (err?.response?.config?.url?.includes(slug) && err.response.status === 404) {
                     setError('Blog post not found.');
                } else if (err?.response?.config?.url?.includes(slug)) {
                     setError('Failed to load blog post. Please try again later.');
                }
                if (err?.response?.config?.url?.endsWith('/blogs')) {
                    setRelatedError('Failed to load related posts.');
                } else if (!err?.response?.config?.url?.includes(slug)) {
                     setRelatedError('Failed to load related posts.');
                }
                if (!error && !relatedError) {
                    setError('An error occurred while loading the page.');
                }
            } finally {
                setLoading(false);
                setRelatedLoading(false);
            }
        };
        fetchBlogData();
    }, [slug]); 

    useEffect(() => {
    document.title = 'IntegralX - Blog';
  }, []);
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (!commentAuthor || !commentText) {
            setSubmitStatus({ success: false, message: 'Name and comment fields are required.' });
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: '' });
        const commentData = {
            authorName: commentAuthor,
            commentText: commentText
        };
        const optimisticComment = {
            _id: `temp-comment-${Date.now()}`,
            authorName: commentAuthor,
            commentText: commentText,
            commentDate: new Date().toISOString(),
            replies: [] 
        };
        setBlog(prevBlog => ({
            ...prevBlog,
            comments: [...(prevBlog?.comments || []), optimisticComment]
        }));
        setCommentAuthor('');
        setCommentEmail('');
        setCommentText('');
        try {
            const savedComment = await addComment(slug, commentData);
            setBlog(prevBlog => {
                const updatedComments = (prevBlog?.comments || []).map(comment =>
                    comment._id === optimisticComment._id ? { ...savedComment, replies: savedComment.replies || [] } : comment
                );
                if (!updatedComments.find(c => c._id === (savedComment._id || optimisticComment._id))) {
                     updatedComments.push({ ...savedComment, replies: savedComment.replies || [] });
                }
                return {
                    ...prevBlog,
                    comments: updatedComments
                };
            });
            setSubmitStatus({ success: true, message: 'Comment submitted successfully!' });

        } catch (err) {
            console.error("Error submitting comment:", err);
            setBlog(prevBlog => ({
                ...prevBlog,
                comments: (prevBlog?.comments || []).filter(comment => comment._id !== optimisticComment._id)
            }));
            const errorMessage = err.response?.data?.error || 'Failed to submit comment. Please try again.';
            setSubmitStatus({ success: false, message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (submitStatus.message) {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
            messageTimeoutRef.current = setTimeout(() => {
                setSubmitStatus({ success: null, message: '' });
                messageTimeoutRef.current = null;
            }, 3000);
        }
        return () => {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
        };
    }, [submitStatus.message]);

    useEffect(() => {
        if (replySubmitStatus.message && replySubmitStatus.commentId) {
            if (replyMessageTimeoutRef.current) {
                clearTimeout(replyMessageTimeoutRef.current);
            }
            replyMessageTimeoutRef.current = setTimeout(() => {
                setReplySubmitStatus({ success: null, message: '', commentId: null });
                replyMessageTimeoutRef.current = null;
            }, 3000);
        }
        return () => {
            if (replyMessageTimeoutRef.current) {
                clearTimeout(replyMessageTimeoutRef.current);
            }
        };
    }, [replySubmitStatus.message, replySubmitStatus.commentId]);


    const handleOpenReplyForm = (commentId) => {
        setReplyingToCommentId(commentId);
        setReplyAuthor(''); 
        setReplyText('');   
        setReplySubmitStatus({ success: null, message: '', commentId: null }); 
    };

    const handleCancelReply = () => {
        setReplyingToCommentId(null);
        setReplyAuthor('');
        setReplyText('');
        setReplySubmitStatus({ success: null, message: '', commentId: null });
    };

    const handleReplySubmit = async (event, parentCommentId) => {
        event.preventDefault();
        if (!replyAuthor || !replyText) {
            setReplySubmitStatus({ success: false, message: 'Name and reply fields are required.', commentId: parentCommentId });
            return;
        }
        setIsSubmittingReply(true);
        setReplySubmitStatus({ success: null, message: '', commentId: parentCommentId });

        const replyData = {
            authorName: replyAuthor,
            commentText: replyText
        };

        const optimisticReply = {
            _id: `temp-reply-${Date.now()}`,
            authorName: replyAuthor,
            commentText: replyText,
            replyDate: new Date().toISOString() 
        };

        setBlog(prevBlog => {
            if (!prevBlog) return prevBlog;
            const updatedComments = prevBlog.comments.map(comment => {
                if (comment._id === parentCommentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), optimisticReply]
                    };
                }
                return comment;
            });
            return { ...prevBlog, comments: updatedComments };
        });

        setReplyAuthor('');
        setReplyText('');

        try {
            const savedReply = await addReplyToComment(slug, parentCommentId, replyData);
            setBlog(prevBlog => {
                if (!prevBlog) return prevBlog;
                const updatedComments = prevBlog.comments.map(comment => {
                    if (comment._id === parentCommentId) {
                        const updatedReplies = (comment.replies || []).map(reply =>
                            reply._id === optimisticReply._id ? savedReply : reply
                        );
                        if (!updatedReplies.find(r => r._id === (savedReply._id || optimisticReply._id))) {
                            updatedReplies.push(savedReply);
                        }
                        return { ...comment, replies: updatedReplies };
                    }
                    return comment;
                });
                return { ...prevBlog, comments: updatedComments };
            });
            setReplySubmitStatus({ success: true, message: 'Reply submitted successfully!', commentId: parentCommentId });
            setReplyingToCommentId(null); 

        } catch (err) {
            console.error(`Error submitting reply to comment ${parentCommentId}:`, err);
            setBlog(prevBlog => {
                if (!prevBlog) return prevBlog;
                const updatedComments = prevBlog.comments.map(comment => {
                    if (comment._id === parentCommentId) {
                        return {
                            ...comment,
                            replies: (comment.replies || []).filter(reply => reply._id !== optimisticReply._id)
                        };
                    }
                    return comment;
                });
                return { ...prevBlog, comments: updatedComments };
            });
            const errorMessage = err.response?.data?.error || 'Failed to submit reply. Please try again.';
            setReplySubmitStatus({ success: false, message: errorMessage, commentId: parentCommentId });
        } finally {
            setIsSubmittingReply(false);
        }
    };


    const renderContent = () => {
        if (loading) return <p className="text-center text-gray-400 py-20">Loading post...</p>;
        if (error) return ( <p className="text-center text-red-500 py-20">{error}</p>);
        if (!blog) return <p className="text-center text-gray-500 py-20">Blog post not found.</p>;

        return (
          <div>
            <div className="px-8 flex flex-col lg:flex-row gap-8 lg:gap-4">
              <article className="flex-grow h-fit lg:w-2/3">
                <header className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {blog.title}
                  </h1>
                  <div className="flex flex-wrap justify-between mb-8 items-center gap-x-4 text-sm text-gray-400">
                    <div className="flex gap-2 mb-2 md:mb-0">
                      <img
                        className="w-10 h-10"
                        src={"/avatar.png"}
                        alt={`clock`}
                      />
                      <span className="text-gray-500">
                        Posted by : <br></br>
                        <span className="text-gray-200">
                          {blog.author || "Admin"}
                        </span>
                      </span>
                    </div>
                    <div className="flex">
                      <span className="flex gap-1 text-gray-500">
                        <img
                          className="w-5 h-5"
                          src={"/clock_grey.png"}
                          alt={`clock`}
                        />
                        {formatPostDate(blog.publishDate)}
                      </span>
                      <span className="flex ml-4 gap-1">
                        <img
                          className="w-5 h-5"
                          src={"/comment_grey.png"}
                          alt={`clock`}
                        />
                        <a
                          href="#comments-section"
                          className="text-gray-500 hover:text-brand-yellow"
                        >
                          {blog.comments?.length || 0} Comment
                          {blog.comments?.length !== 1 ? "s" : ""}
                        </a>
                      </span>
                    </div>
                  </div>
                </header>
                <img
                  src={blog.featuredImage || "/placeholder.jpg"}
                  alt={`Featured image for ${blog.title}`}
                  className="min-w-full rounded-lg shadow-md mb-8 lg:max-h-[55vh] object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <div className="text-white leading-relaxed space-y-6 text-base">
                  {blog.contentIntro && <p>{blog.contentIntro}</p>}
                  {blog.contentSection1 && ( <p className="font-semibold text-white text-lg lg:mr-40"> {blog.contentSection1} </p> )}
                  {blog.contentSection2 && ( <p className="text-[#FFFFFF87] text-base"> {blog.contentSection2} </p> )}
                  {blog.contentBlockquote && (
                    <blockquote className="relative bg-[#232323] rounded-lg p-6 my-8 text-[#FFFFFF87] text-base italic">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img className="w-12 h-12 self-center justify-self-center" src={"/quote_icon.png"} alt={`quote`} />
                        <img className="hidden lg:block w-2 h-24" src={"/Line.png"} alt={`line`} />
                        <span>{blog.contentBlockquote}</span>
                      </div>
                    </blockquote>
                  )}
                  {blog.contentSection3 && ( <p className="text-[#FFFFFF87] text-base"> {blog.contentSection3} </p> )}
                </div>
              </article>
               <aside className="lg:w-1/3 lg:px-8 flex-shrink-0">
                <div className="mb-8">
                  <form className="relative">
                    <input type="search" placeholder="Search..." className="w-full p-3 pl-4 pr-10 bg-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none" />
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-yellow" >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className="bg-[#262626] p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-semibold text-white mb-4"> Related posts </h3>
                  {relatedLoading ? ( <p className="text-gray-500 text-sm"> Loading related posts... </p>
                  ) : relatedError ? ( <p className="text-red-500 text-sm">{relatedError}</p>
                  ) : (
                    <div className="space-y-4">
                      {allBlogs && allBlogs.length > 1 && blog ? (
                        allBlogs
                          .filter( (relatedBlog) => relatedBlog.slug !== blog.slug )
                          .slice(0, 2)
                          .map((relatedBlog) => (
                            <div key={relatedBlog.slug} className="flex flex-col md:flex-row items-center gap-4 pt-8 border-t border-gray-700" >
                              <Link to={`/blog/${relatedBlog.slug}`} className="flex-shrink-0 self-start" >
                                <img src={ relatedBlog.featuredImage || "/placeholder.jpg" } alt={`Related: ${relatedBlog.title}`} className="md:w-32 md:h-24 w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity" onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.jpg"; }} />
                              </Link>
                              <div>
                                <Link to={`/blog/${relatedBlog.slug}`} className="text-lg font-medium text-white hover:text-brand-yellow leading-tight block mb-1" > {relatedBlog.title} </Link>
                                <span className="flex gap-1 text-[15px] text-gray-400 font-normal mt-2">
                                  <img className="w-5 h-5" src={"/clock_grey.png"} alt={`clock`} />
                                  {formatPostDate(relatedBlog.publishDate)}
                                </span>
                              </div>
                            </div>
                          ))
                      ) : ( <p className="text-gray-500 text-sm"> No other related posts found. </p> )}
                      {allBlogs && blog && allBlogs.filter((rb) => rb.slug !== blog.slug) .length === 0 && ( <p className="text-gray-500 text-sm"> No other related posts found. </p> )}
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <section id="comments-section" className="mt-12 px-8 pt-0">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Comment ({blog.comments?.length || 0})
              </h2>

              <div className="space-y-6 mb-10">
                {blog.comments && blog.comments.length > 0 ? (
                  blog.comments.map((comment, index) => (
                    <div key={comment._id || `comment-${index}`} className="bg-[#1f1f1f] p-6 rounded-md"> 
                      <div className="flex space-x-4"> 
                        <div className="flex-grow">
                          <div className="flex justify-between items-baseline mb-1">
                            <strong className="text-white font-medium">
                              {comment.authorName}
                            </strong>
                            <span className="text-xs text-gray-500">
                              {formatCommentDate(comment.commentDate)}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">
                            {comment.commentText}
                          </p>
                          <button
                            onClick={() => handleOpenReplyForm(comment._id)}
                            className="text-xs text-brand-yellow hover:underline font-semibold"
                          >
                            Reply
                          </button>
                        </div>
                      </div>

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 border-gray-700 ">
                          {comment.replies.map((reply, replyIndex) => (
                            <div key={reply._id || `reply-${replyIndex}`} className="bg-[#2a2a2a] p-6 rounded-md"> 
                              <div className="flex justify-between items-baseline mb-1">
                                <strong className="text-white font-medium text-sm">
                                  {reply.authorName}
                                </strong>
                                <span className="text-xs text-gray-500">
                                  {formatCommentDate(reply.replyDate || reply.commentDate)}
                                </span>
                              </div>
                              <p className="text-gray-400 text-xs">
                                {reply.commentText}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {replyingToCommentId === comment._id && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <h4 className="text-md font-semibold text-white mb-2">
                            Replying to {comment.authorName}
                          </h4>
                           {replySubmitStatus.message && replySubmitStatus.commentId === comment._id && (
                                <p className={`mb-3 p-2 rounded text-xs ${
                                    replySubmitStatus.success ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"
                                }`}>
                                    {replySubmitStatus.message}
                                </p>
                            )}
                          <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="space-y-3">
                            <div>
                              <label htmlFor={`replyAuthor-${comment._id}`} className="sr-only">Your name*</label>
                              <input
                                type="text"
                                id={`replyAuthor-${comment._id}`}
                                placeholder="Your name*"
                                required
                                value={replyAuthor}
                                onChange={(e) => setReplyAuthor(e.target.value)}
                                className="w-full p-2 bg-[#2a2a2a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
                              />
                            </div>
                            <div>
                              <label htmlFor={`replyText-${comment._id}`} className="sr-only">Your reply*</label>
                              <textarea
                                id={`replyText-${comment._id}`}
                                rows="3"
                                placeholder="Your reply*"
                                required
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full p-2 bg-[#2a2a2a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
                              ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="submit"
                                disabled={isSubmittingReply}
                                className="px-4 py-1.5 bg-brand-yellow text-black font-semibold rounded-md hover:bg-yellow-400 text-xs transition duration-200 disabled:opacity-50"
                              >
                                {isSubmittingReply ? "Submitting..." : "Submit Reply"}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelReply}
                                className="px-4 py-1.5 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 text-xs transition duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No comments yet. Be the first to leave a reply!
                  </p>
                )}
              </div>
              <div id="reply" className="leave-reply-form mt-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Leave A Comment
                </h3>
                <p className="text-base text-gray-500 mb-4">
                  Your email address will not be published. Required fields are marked *
                </p>
                {submitStatus.message && (
                  <p
                    className={`mb-4 p-3 rounded text-sm ${
                      submitStatus.success
                        ? "bg-green-900 text-green-100"
                        : "bg-red-900 text-red-100"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="authorName" className="sr-only"> Your name* </label>
                      <input type="text" id="authorName" name="authorName" placeholder="Your name*" required value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} className="w-full p-3 bg-[#2a2a2a] rounded-2xl text-white placeholder-gray-500 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only"> Email address* </label>
                      <input type="email" id="email" name="email" placeholder="Email address*" required value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)} className="w-full p-3 bg-[#2a2a2a]  rounded-2xl text-white placeholder-gray-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="commentText" className="sr-only"> Your comment* </label>
                    <textarea id="commentText" name="commentText" rows="5" placeholder="Your comment*" required value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-3 bg-[#2a2a2a] rounded-2xl text-white placeholder-gray-500 focus:outline-none " ></textarea>
                  </div>
                  <div className="flex items-center justify-center">
                    <button type="submit" disabled={isSubmitting} className="px-10 py-3 bg-brand-yellow text-black font-semibold rounded-xl hover:bg-yellow-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" >
                      {isSubmitting ? "Submitting..." : "Submit Comment"}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        );
    };

    return (
        <>
            <div className="flex flex-col bg-black">
                <Header />
                 <main className="flex py-12 lg:py-16">
                    <div className="mx-auto px-4">
                         {renderContent()}
                    </div>
                 </main>
                <Footer />
            </div>
        </>
    );
}

export default BlogPostPage;
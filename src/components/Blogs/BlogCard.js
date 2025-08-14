import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

function BlogCard({ blog }) {
  const { title, contentIntro, featuredImage, publishDate, slug } = blog;

  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      const isClamped = element.scrollHeight > element.clientHeight;
      setShowReadMore(isClamped);
    }
  }, [contentIntro, slug]);

  if (!slug) {
    console.warn("BlogCard rendered without a slug:", blog);
    return null;
  }

  const handleShare = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const shareUrl = `${window.location.origin}/blog/${slug}`;
    const shareTitle = title || "Check out this blog post!";
    const shareText = contentIntro || "Interesting article from Integral X";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        console.log("Blog post shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Blog post link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <div className="blog-card bg-[#1f2937] rounded-lg max-w-[375px] overflow-hidden shadow-lg flex flex-col h-[580px] transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <Link
        to={`/blog/${slug}`}
        className="block hover:opacity-90 transition-opacity duration-200"
      >
        <img
          src={featuredImage || "/images/placeholder.jpg"}
          alt={`Featured image for ${title}`}
          className="w-full h-[260px] object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder.jpg";
          }}
        />

        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <Link
            to={`/blog/${slug}`}
            className="block hover:text-brand-yellow transition-colors duration-200"
          >
            <h3 className="text-lg md:text-2xl pr-4 font-semibold text-white mb-2 leading-tight">
              {title || "Untitled Post"}
            </h3>
          </Link>
          <div className="flex-grow mt-4 mb-4"> 
          <p
            ref={contentRef}
            className="text-white text-[16px] line-clamp-2" 
          >
            {contentIntro || "No excerpt available."}
          </p>
          {showReadMore && (
            <Link
              to={`/blog/${slug}`}
              className="text-brand-yellow hover:text-yellow-400 text-[14px] font-semibold hover:underline mt-1 inline-block" // Assuming brand-yellow is defined
            >
              Read more
            </Link>
          )}
        </div>

          <div className="flex justify-between items-center mt-auto pt-4">
            <span className="text-sm text-white font-normal">
              {formatDate(publishDate)}
            </span>
            <div className="flex flex-end">
              <button
                onClick={handleShare}
                title="Share Post"
                className="p-0 bg-transparent border-none cursor-pointer"
              >
                <img src="/share.png" alt="Share" className="h-7 w-7 " />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;

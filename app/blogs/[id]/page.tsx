import type { PostType } from "@/app/post/actions";
import { redirect } from "next/navigation";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  const post = (await Post.findOne({ id: id })) as PostType & { author?: string };
  if (!post) redirect("/");

  const authorName = post.author || "TheGeekachu";

  return (
    <main>
      <div style={{ marginBottom: "32px" }}>
        <Link 
          href="/blogs" 
          className="badge" 
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          &larr; Back to all posts
        </Link>
      </div>

      <header className="blog-header">
        <h1>{post.title}</h1>
        
        <div className="post-meta" style={{ marginTop: "16px", fontSize: "0.95rem" }}>
          <span>By <strong>{authorName}</strong></span>
          <span>&bull;</span>
          <time dateTime={post.date.toISOString()}>
            {post.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      <section>
        <div className="section-title">Article</div>
        <article className="card post-content" style={{ padding: "36px" }}>
          {Array.isArray(post.content) ? (
            post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <p>{post.content}</p>
          )}
        </article>
      </section>
    </main>
  );
}

export default Page;
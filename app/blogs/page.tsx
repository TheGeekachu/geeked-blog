import type { PostType } from "../post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Page() {
  await dbConnect();
  const allPosts = (await Post.find().sort({ date: -1 })) as PostType[];

  return (
    <main>
      <section id="blog-posts">
        <div className="section-title">All Articles</div>

        {allPosts.length > 0 ? (
          <div className="post-list">
            {allPosts.map((post, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <Link
                  href={`/blogs/${post.id}`}
                  key={post.id}
                  className="post-card"
                >
                  <div className="post-meta">
                    <span className="tag">{formattedIndex}</span>
                    <time dateTime={post.date.toISOString()}>
                      {post.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2>{post.title}</h2>
                  <p>Read post &rarr;</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <h3>00 // Empty Database</h3>
            <p style={{ marginBottom: "20px" }}>
              No blogs published yet.
            </p>
            <Link
              href="/post"
              className="badge"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Create the first blog post &rarr;
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Page;
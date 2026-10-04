import Link from "next/link";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import type { PostType } from "@/app/post/actions";

export default async function Home() {
  await dbConnect();
  const recentPosts = (await Post.find()
    .sort({ date: -1 })
    .limit(3)) as PostType[];

  return (
    <main>
      <header>
        <div className="badge">Engineering & Technical Journal</div>
        <h1>
          Documenting builds, code, and <span>hardware experiments</span>.
        </h1>
        <p className="hero-p" style={{marginBottom: "20px"}}>
          Welcome to my blog. This is where I publish long-form write-ups, breakdown 
          complex engineering challenges, and log lessons learned across software, 
          robotics, CAD, and systems programming.
        </p>
      </header>

      <section id="topics">
        <div className="section-title">Core Topics</div>
        <div className="skills-group">
          <div className="badge">Software Stuff</div>
          <div className="badge">Aerospace & Physics</div>
          <div className="badge">Robotics & Arduino C++</div>
          <div className="badge">CAD & Hardware</div>
          <div className="badge">Linux Stuff</div>
        </div>
      </section>

      <section id="latest">
        <div className="section-title">Recent Articles</div>

        {recentPosts.length > 0 ? (
          <div className="post-list">
            {recentPosts.map((post, index) => {
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
                  <p>Read article &rarr;</p>
                </Link>
              );
            })}

            <div style={{ marginTop: "12px" }}>
              <Link href="/blogs" className="badge" style={{ textDecoration: "none" }}>
                View all articles &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: "32px", textAlign: "center" }}>
            <h3>00 // Blog Launching Soon</h3>
            <p style={{ color: "var(--muted)", margin: "12px 0 20px" }}>
              Articles are currently being written. Check back soon or create the first post!
            </p>
            <Link href="/post" className="badge" style={{ textDecoration: "none" }}>
              Create a post &rarr;
            </Link>
          </div>
        )}
      </section>

      <footer style={{marginBottom: "50px"}}>
        <p>© 2026 TheGeekachuDev. I speak out against vibecoders.</p>
        <div>
          <a href="https://github.com/TheGeekachu" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://stardance.hackclub.com/@TheGeekachu"
            target="_blank"
            rel="noreferrer"
          >
            Hack Club
          </a>
          <a href="mailto:vijayakasee@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  );
}
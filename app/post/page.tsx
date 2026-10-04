import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";

async function Page() {
  const auth = await initAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main>
      <header>
        <div className="badge">Community Posts</div>
        <h1>
          Publish a <span>new post</span>.
        </h1>
      </header>

      <section>
        <div className="section-title">Editor</div>
        <div className="card" style={{ padding: "32px" }}>
          <PostForm />
        </div>
      </section>
    </main>
  );
}

export default Page;
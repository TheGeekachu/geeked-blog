"use client";

import { postBlog, type PostType } from "@/app/post/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newPost, setNewPost] = useState<PostType>({
    id: crypto.randomUUID(),
    date: new Date(),
    title: "",
    content: [""],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const slug = newPost.title
      ? newPost.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      : newPost.id;

    const postPayload = {
      ...newPost,
      id: slug,
      date: new Date(),
    };

    try {
      await postBlog(postPayload);
      router.push(`/blogs/${postPayload.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            padding: "12px 16px",
            borderRadius: "var(--radius)",
            fontSize: "0.88rem",
            lineHeight: "1.5",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      <label>
        Title
        <input
          type="text"
          placeholder="Article Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
      </label>

      {newPost.content.map((paragraph, i) => (
        <label key={i}>
          Paragraph {i + 1}
          <textarea
            placeholder="Write paragraph content..."
            value={paragraph}
            onChange={(e) => {
              const content = [...newPost.content];
              content[i] = e.target.value;
              setNewPost({ ...newPost, content });
            }}
            required
          />
        </label>
      ))}

      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <button
          type="button"
          className="badge"
          style={{ cursor: "pointer", border: "1px solid var(--border)" }}
          onClick={() =>
            setNewPost({ ...newPost, content: [...newPost.content, ""] })
          }
        >
          + Add Paragraph
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Post \u2192"}
        </button>
      </div>
    </form>
  );
}
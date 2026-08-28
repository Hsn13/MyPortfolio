import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Engineering Journal | Hasan Khesro",
  description: "Notes on building products, coordinating AI projects, and what customer-facing work taught me about engineering.",
};

export default function BlogIndex() {
  return (
    <main className="bg-bg text-ink">
      <Nav />
      <section className="pt-40 pb-24 md:pt-52">
        <div className="container-px mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Writing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Engineering Journal</h1>
          <p className="mt-4 max-w-xl text-muted">
            Notes on building products, coordinating AI delivery, and what customer-facing work taught me about
            engineering.
          </p>

          <div className="mt-14 space-y-10">
            {posts
              .slice()
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border-t border-border pt-8 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.tags.join(" · ")}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink transition-colors group-hover:text-emerald">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

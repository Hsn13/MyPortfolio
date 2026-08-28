import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import { posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Hasan Khesro`, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="bg-bg text-ink">
      <Nav />
      <article className="pt-40 pb-24 md:pt-52">
        <div className="container-px mx-auto max-w-2xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Engineering Journal
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span aria-hidden>·</span>
            <span>{post.tags.join(" · ")}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-8 space-y-5">
            {post.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted first:text-lg first:text-ink">
                {p}
              </p>
            ))}
          </div>
        </div>
      </article>
      <Contact />
    </main>
  );
}

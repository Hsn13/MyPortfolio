import assert from "node:assert/strict";
import test from "node:test";
import {
  errorMessage,
  getLinkedInWritingContext,
  parseRssItems,
  resolveSources,
  selectRecentSources,
} from "./update-journal.mjs";

const now = new Date("2026-09-30T12:00:00Z");

test("parses recent RSS articles and decodes their text", () => {
  const xml = `<?xml version="1.0"?>
    <rss version="2.0"><channel><item>
      <title><![CDATA[New AI &amp; cloud release]]></title>
      <link>https://example.com/news?id=1&amp;source=rss</link>
      <description><![CDATA[<p>A detailed announcement with useful technical context.</p>]]></description>
      <pubDate>Tue, 29 Sep 2026 10:00:00 GMT</pubDate>
    </item></channel></rss>`;

  assert.deepEqual(parseRssItems(xml, "Example", now), [
    {
      title: "New AI & cloud release",
      description: "A detailed announcement with useful technical context.",
      url: "https://example.com/news?id=1&source=rss",
      publisher: "Example",
      publishedAt: "Tue, 29 Sep 2026 10:00:00 GMT",
    },
  ]);
});

test("excludes RSS entries outside the 14-day window and future entries", () => {
  const xml = `<rss><channel>
    <item><title>Old technology announcement</title><link>https://example.com/old</link><description>Useful but outside the date window.</description><pubDate>Wed, 10 Sep 2026 10:00:00 GMT</pubDate></item>
    <item><title>Future technology announcement</title><link>https://example.com/future</link><description>Not published yet.</description><pubDate>Thu, 1 Oct 2026 10:00:00 GMT</pubDate></item>
  </channel></rss>`;

  assert.deepEqual(parseRssItems(xml, "Example", now), []);
});

test("accepts only unique source indexes from at least two publishers", () => {
  const sources = [
    { title: "Article one", url: "https://a.example/1", publisher: "A" },
    { title: "Article two", url: "https://b.example/2", publisher: "B" },
    { title: "Article three", url: "https://a.example/3", publisher: "A" },
  ];

  assert.deepEqual(resolveSources([0, 1], sources), [
    { title: "Article one", url: "https://a.example/1" },
    { title: "Article two", url: "https://b.example/2" },
  ]);
  assert.throws(() => resolveSources([0, 0], sources), /distinct supplied sources/);
  assert.throws(() => resolveSources([0, 2], sources), /two distinct publishers/);
  assert.throws(() => resolveSources([0, 9], sources), /distinct supplied sources/);
});

test("limits the candidate list to three recent articles per publisher", () => {
  const sources = Array.from({ length: 8 }, (_, index) => ({
    title: `Article ${index}`,
    url: `https://a.example/${index}`,
    publisher: index < 5 ? "A" : "B",
    publishedAt: new Date(now.getTime() - index * 60_000).toISOString(),
  }));

  const selected = selectRecentSources(sources);
  assert.equal(selected.length, 6);
  assert.deepEqual(selected.slice(0, 3).map(({ title }) => title), ["Article 0", "Article 1", "Article 2"]);
  assert.equal(selected.filter(({ publisher }) => publisher === "A").length, 3);
  assert.equal(selected.filter(({ publisher }) => publisher === "B").length, 3);
});

test("accepts optional LinkedIn writing context without logging or transforming it", () => {
  assert.equal(getLinkedInWritingContext(undefined), "");
  assert.equal(getLinkedInWritingContext("  "), "");
  assert.equal(getLinkedInWritingContext("  A post about building useful products.  "), "A post about building useful products.");
  assert.throws(() => getLinkedInWritingContext("a".repeat(32_001)), /no longer than 32,000 characters/);
});

test("explains Gemini quota and model availability errors", () => {
  assert.match(
    errorMessage(new Error('{"error":{"code":429,"status":"RESOURCE_EXHAUSTED","message":"quota exceeded"}}')),
    /quota or rate limit is exhausted/,
  );
  assert.match(
    errorMessage(new Error('{"error":{"code":404,"status":"NOT_FOUND","message":"model unavailable"}}')),
    /could not find or use model "gemini-3.1-flash-lite"/,
  );
});

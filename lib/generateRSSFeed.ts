import RSS from "rss";
import { getAllPosts } from "../lib/mdx";

import fs from "fs";

export default async function generateRssFeed() {
  let site_url = "https://www." + process.env.NEXT_PUBLIC_VERCEL_URL;
  const allposts = getAllPosts(["title", "slug", "date", "description"]);
  if (typeof site_url !== "string") {
    site_url = "localhost:3000";
  }

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);
  allposts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/writing/${post.slug}`,
      date: post.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}

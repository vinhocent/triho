import RSS from "rss";
import { getAllPosts } from "../lib/mdx";

import fs from "fs";

export default async function generateRssFeed() {
  let site_url = "https://www.triho.dev";
  const allposts = getAllPosts(["title", "slug", "date", "content"]);

  const feedOptions = {
    title: "tr1e | RSS Feed",
    description: "@f0r3st",
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
      description: post.content,
      url: `${site_url}/writing/${post.slug}`,
      date: post.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}

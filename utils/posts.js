import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { logError } from "./error-handling";

const postsDirectory = path.join(process.cwd(), "db/posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const getAllPostsIds = async () => {
  try {
    const fileNames = await fs.promises.readdir(postsDirectory);

    return fileNames.map((fileName) => ({
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    }));
  } catch (error) {
    logError(error, "getAllPostsIds util");
    return [];
  }
};

export const getPostData = async (id) => {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = await fs.promises.readFile(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } catch (error) {
    logError(error, "getPostData util");
    return { id };
  }
};

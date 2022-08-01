import Layout, { siteTitle } from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../global-styles/utils.module.css";
import { getSortedPostsData } from "../utils/posts";
import { logError } from "../utils/error-handling";

const Home = ({ allPostsData }) => {
  const posts = allPostsData.map(({ id, date, title }) => (
    <li className={utilStyles.listItem} key={id}>
      <Link href={`/posts/${id}`}>
        <a>{title}</a>
      </Link>
      <br />
      <small className={utilStyles.lightText}>
        <Date dateString={date} />
      </small>
    </li>
  ));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'am Dimas. I'am hochu normal'niy framework</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <Link href="/posts/ssg-ssr">
          <a>To first post</a>
        </Link>
      </section>
      <section>
        <h2 className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>Blog</h2>
        <ul className={utilStyles.list}>{posts}</ul>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const allPostsData = await getSortedPostsData();

    return {
      props: {
        allPostsData,
      },
    };
  } catch (error) {
    logError(error, "pages/index getStaticProps");
  }
};

export default Home;

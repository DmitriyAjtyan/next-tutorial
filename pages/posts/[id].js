import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../utils/posts";
import { logError } from "../../utils/error-handling";
import Head from "next/head";
import Date from "../../components/Layout/Date";

import styles from "../../global-styles/utils.module.css";

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={styles.headingXl}>{postData.title}</h1>
        <div className={styles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  try {
    const paths = await getAllPostsIds();

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    logError(error, "pages/posts getStaticPaths");
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const postData = await getPostData(params.id);

    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    logError(error, "pages/posts getStaticProps");
  }
};

export default Post;

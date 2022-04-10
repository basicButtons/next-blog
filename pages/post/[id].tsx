import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../libs/post";

interface PostProp {
  title: string;
  id: string;
  date: string;
  contentHtml: string;
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async function ({
  params,
}: {
  params: { id: string };
}) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: { postData: PostProp }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

import { useRouter } from "next/router"
import { getAllPostIds, getPostData } from "../../lib/posts"

import utilStyles from "/styles/utils.module.css"

import Layout from "components/layouts/Layout"
import Date from "components/Date"

export default function Post({ postData }) {
	const router = useRouter()

	if (router.isFallback) return <div>Loading...</div>
	return (
		<>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title} </h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
			</article>
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</>
	)
}

Post.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData,
		},
	}
}

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: true,
	}
}

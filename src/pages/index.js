import Head from "next/head"
import utilStyles from "/styles/utils.module.css"
import Link from "next/link"

import { getSortedPostsData } from "lib/posts"

import Layout, { siteTitle } from "../components/layouts/Layout"
import Date from "components/Date"

export default function Home({ allPostsData }) {
	return (
		<>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>I love coding 😍</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</>
	)
}

Home.getLayout = function getLayout(page) {
	return <Layout home>{page}</Layout>
}

export async function getStaticProps() {
	const allPostsData = await getSortedPostsData()
	return {
		props: {
			allPostsData,
		},
	}
}

// export async function getServerSideProps() {
// 	const allPostsData = getSortedPostsData()

// 	console.log("server")
// 	console.log(allPostsData)
// 	return {
// 		props: {
// 			allPostsData,
// 		},
// 		revalidate: 1,
// 	}
// }

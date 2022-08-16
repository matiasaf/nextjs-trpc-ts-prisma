import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostsListPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <div>List of posts loading ...</div>;
  }

  if (!data) {
    return <div>There are no posts at all</div>;
  }

  return (
    <div>
      <h1>Posts List</h1>
      {data.map((item) => (
        <article key={item.id}>
          <p>{item.title}</p>
          <Link href={`/posts/${item.id}`}> More details</Link>
        </article>
      ))}
    </div>
  );
}

export default PostsListPage;

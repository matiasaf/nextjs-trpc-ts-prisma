import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/user.context";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function NewPostPage() {
  const router = useRouter();
  const user = useUserContext();

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess(post) {
      router.push(`/posts/${post.id}`);
    },
  });

  const { handleSubmit, register } = useForm<CreatePostInput>();

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  if (!user) {
    return <div>You need to be logged in for creating a post.</div>;
  }

  return (
    <>
      <h1>Add new post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        <input
          type="text"
          placeholder="Your post title"
          {...register("title")}
        />
        <br />
        <textarea placeholder="Your body post" {...register("body")} />
        <br />

        <button type="submit">Create post</button>
      </form>
    </>
  );
}

export default NewPostPage;

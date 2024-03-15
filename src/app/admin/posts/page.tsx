import { getPosts } from "./utils";
import PostTable from "./components/PostTable";
import Breadcrumb from "@/components/admin/Breadcrumb";
import PrimaryLink from "@/components/admin/PrimaryLink";
import SearchInput from "@/components/admin/SearchInput";
import { getPaginationPayload } from "@/utils/urlUtil";
import Pagination from "@/components/admin/Pagination";

export default async function AdminPosts({
  searchParams,
}: {
  searchParams: SearchParamsString;
}) {
  const paginationPayload = getPaginationPayload(searchParams);
  const posts = await getPosts(paginationPayload);

  return (
    <>
      <Breadcrumb pageName="Posts" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="m-8 flex flex-wrap-reverse justify-between gap-4">
            <PrimaryLink
              href="/admin/posts/create"
              className="w-full text-sm font-semibold sm:w-72 sm:text-base"
            >
              Create Post
            </PrimaryLink>
          </div>
          <div className="mx-8 mb-4 flex justify-end">
            <SearchInput
              name="search"
              className="w-full text-sm sm:w-72 sm:text-base"
              placeholder="Search..."
            />
          </div>
          <div className="mx-8 mb-8">
            <PostTable pagination={posts} />
            <Pagination {...posts} />
          </div>
        </div>
      </div>
    </>
  );
}

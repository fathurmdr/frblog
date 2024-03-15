import Link from "next/link";

type ParentUrl = {
  name: string;
  url: string;
};

interface BreadcrumbProps {
  pageName: string;
  parentUrls?: ParentUrl[];
}

export default function Breadcrumb({
  pageName,
  parentUrls = [],
}: BreadcrumbProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {parentUrls.map((parentUrl, index) => (
            <li key={index}>
              <Link className="capitalize" href={parentUrl.url}>
                {parentUrl.name} /
              </Link>
            </li>
          ))}
          <li className="capitalize text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
}

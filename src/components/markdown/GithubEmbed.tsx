import Prism from "prismjs";
import loadLanguages from "prismjs/components/index";
import "prismjs/themes/prism-tomorrow.min.css";

const parseUrl = ({ url }: { url: string }) => {
  // a pattern to match line numbers in the URL hash, e.g. #L10-L20
  const hashLinesPattern = /#L(\d+)(-L(\d+))?$/;
  const contentUrl = new URL(url);
  const originalUrl = new URL(contentUrl.toString());

  // convert to a raw.githubusercontent.com URL
  contentUrl.pathname = contentUrl.pathname.replace(/\/blob\//, "/");
  contentUrl.hostname = "raw.githubusercontent.com";

  // get the line numbers if present
  const hashMatch = contentUrl.hash.match(hashLinesPattern);
  let startLine: number | null = null;
  let endLine: number | null = null;
  if (hashMatch) {
    startLine = parseInt(hashMatch[1], 10);
    if (hashMatch[3]) {
      endLine = parseInt(hashMatch[3], 10);
    }
    contentUrl.hash = "";
  }

  // parse the file type from the pathname. Might need more robust handling here later.
  const fileType = contentUrl.pathname.split(".").pop()?.trim() || "txt";

  const pathParts = contentUrl.pathname.split("/");
  if (pathParts.length < 4) {
    throw new Error("Invalid GitHub URL format.");
  }

  const ghOwner = pathParts[1];
  const ghRepo = pathParts[2];
  const ghPath = pathParts.slice(4).join("/");

  return {
    originalUrl,
    contentUrl,
    startLine,
    endLine: startLine && endLine && endLine >= startLine ? endLine : null,
    fileType,
    github: {
      owner: ghOwner,
      repo: ghRepo,
      path: ghPath,
    },
  };
};

const fetchContent = async ({
  url,
  startLine,
  endLine,
}: {
  url: string | URL;
  startLine: number | null;
  endLine: number | null;
}) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from GitHub: ${response.status}`);
  }

  let content = await response.text();

  // if line numbers are specified, extract those lines
  if (typeof startLine === "number") {
    const lines = content.split("\n");
    const selectedLines = lines.slice(
      startLine - 1,
      endLine ? endLine : startLine
    );

    content = selectedLines.join("\n");
  }

  return content.trim();
};

const lineCountPrefix = ({
  lineNumber,
  padding,
}: {
  lineNumber: number;
  padding: number;
}) =>
  `<span class="text-stone-300 dark:text-stone-700 select-none">${String(
    lineNumber
  ).padEnd(padding, "  ")}</span>`;

const generateHtmlString = ({
  content,
  fileType,
  startLine,
}: {
  content: string;
  fileType: string;
  startLine?: number | null;
}) => {
  // load the language for syntax highlighting
  loadLanguages([fileType]);
  const htmlString = Prism.highlight(
    content,
    Prism.languages[fileType],
    fileType
  );

  const htmlStringLines = htmlString.split("\n");
  const stringPadding = String(htmlStringLines.length).length + 1;

  // loop the lines and prefix with line numbers
  const prefixedWithLine = htmlStringLines
    .map(
      (line, index) =>
        `${lineCountPrefix({
          lineNumber:
            typeof startLine === "number" ? startLine + index : index + 1,
          padding: stringPadding,
        })}${line}`
    )
    .join("\n");

  return prefixedWithLine;
};

/**
 * `props["data-url"]` should be a GitHub URL to a file or line range in a repo.
 * This component will convert it to a `raw.githubusercontent.com` URL for embedding.
 */
export const GithubEmbed = async (props: Record<string, unknown>) => {
  const dataUrl = props["data-url"];
  if (typeof dataUrl !== "string") {
    throw new Error("Prop `data-url` of type `string` missing.");
  }

  const { contentUrl, originalUrl, github, startLine, endLine, fileType } =
    parseUrl({ url: dataUrl });
  const content = await fetchContent({ url: contentUrl, startLine, endLine });
  const htmlString = generateHtmlString({ content, fileType, startLine });

  return (
    <section className="w-full overflow-x-hidden px-1 py-2 bg-stone-50 dark:bg-stone-900 rounded-md">
      <a
        href={originalUrl.toString()}
        target="_blank"
        rel="noopener"
        className="block mb-2 text-sm text-blue-600 dark:text-blue-400 hover:underline break-words"
        title="View on GitHub"
      >
        🔗 GitHub &mdash; {github.owner}/{github.repo} &mdash; {github.path}
      </a>
      <pre
        className="w-full overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    </section>
  );
};

const BRANCH_ASCII = [
  "          ,/\\",
  "        ,'/  \\",
  "      ,'/    \\",
  "    ,'/       \\",
  "   / /         \\",
  "  / /   /\\      \\",
  " / /   /  \\      \\",
  "/_/___/____\\______\\",
  "    /      \\",
  "   /  /\\    \\",
  "  /  /  \\    \\",
  " /__/____\\____\\",
  "     /\\",
  "    /  \\",
  "   /    \\",
  "  /_/\\___\\",
  "     /\\",
  "    /  \\",
  "   /_/\\_\\",
].join("\n");

export default function BranchScroller() {
  return (
    <div className="branch-scroller" aria-hidden="true">
      <div className="branch-scroller__layer branch-scroller__layer--back">
        <pre className="branch-scroller__art">{BRANCH_ASCII}</pre>
        <pre className="branch-scroller__art">{BRANCH_ASCII}</pre>
      </div>
      <div className="branch-scroller__layer branch-scroller__layer--front">
        <pre className="branch-scroller__art">{BRANCH_ASCII}</pre>
        <pre className="branch-scroller__art">{BRANCH_ASCII}</pre>
      </div>
    </div>
  );
}

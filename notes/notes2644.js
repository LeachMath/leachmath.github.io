const owner = "LeachMath";
const repo = "CalcII";
const branch = "main";

const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents`;
const cdnBase = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}`;

// --------------------

async function loadPath(path = "") {
  const res = await fetch(apiBase + (path ? "/" + path : ""));
  const data = await res.json();

  renderBreadcrumb(path);
  renderList(data);
}

// --------------------

function renderBreadcrumb(path) {
  const bc = document.getElementById("breadcrumb");
  bc.innerHTML = "";

  const root = makeCrumb("root", "");
  bc.appendChild(root);

  if (!path) return;

  const parts = path.split("/");
  let running = "";

  parts.forEach(p => {
    bc.appendChild(document.createTextNode(" / "));
    running += (running ? "/" : "") + p;
    bc.appendChild(makeCrumb(p, running));
  });
}

function makeCrumb(name, path) {
  const span = document.createElement("span");
  span.textContent = name;
  span.className = "file";
  span.onclick = () => loadPath(path);
  return span;
}

// --------------------

function renderList(items) {
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  items.sort((a,b) => (a.type === "dir" ? -1 : 1));

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "file";

    if (item.type === "dir") {
      div.textContent = "📁 " + item.name;
      div.classList.add("dir");
      div.onclick = () => loadPath(item.path);
    } else {
      div.textContent = "📄 " + item.name;
      div.onclick = () => openFile(item.path);
    }

    list.appendChild(div);
  });
}

// --------------------

function openFile(path) {
  const url = cdnBase + "/" + path;
  const frame = document.getElementById("viewerFrame");
  const lower = path.toLowerCase();

  // ---- PDF.js viewer (best mobile behavior) ----
  if (lower.endsWith(".pdf")) {

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  if (isMobile) {
    window.open(url, "_blank");   // mobile: open native viewer
  } else {
    const viewer = "https://mozilla.github.io/pdf.js/web/viewer.html?file=";
    frame.src = viewer + encodeURIComponent(url);  // desktop
  }

  return;
}

  // ---- Images ----
  if (lower.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    frame.srcdoc = `<img src="${url}" style="max-width:100%">`;
    return;
  }

  // ---- Markdown ----
  if (lower.endsWith(".md")) {
    fetch(url)
      .then(r => r.text())
      .then(t => {
        frame.srcdoc = "<pre style='padding:20px'>" +
          t.replace(/</g,"&lt;") +
          "</pre>";
      });
    return;
  }

  // ---- Text files ----
  if (lower.match(/\.(txt|csv|tex)$/)) {
    fetch(url)
      .then(r => r.text())
      .then(t => {
        frame.srcdoc = "<pre style='padding:20px'>" +
          t.replace(/</g,"&lt;") +
          "</pre>";
      });
    return;
  }

  // ---- HTML or other ----
  frame.src = url;
}

// --------------------

loadPath();
import { Fetch } from './fetchdoc.js';
import { ref } from 'vue';
import { fetchdata } from "./fetch-options.js";

const fetch = new Fetch(fetchdata);

const documents = ref([]);
const docpath = ref([]);
const baseURL = ref(fetchdata.baseURL);
const sharingDocument = ref(false);
// const shareEmail = ref("");
const Warn = ref("");
const Confirm = ref("");

let currentId = ""
let currentType = ""
let documentName = ""

function init() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let folder = "";
  if(params.folder)folder = params.folder
  IndexFolder.value(folder);
}

const IndexFolder = ref((id, type) => {
  currentId = id
  currentType = type
  fetch.get(id, type || "folder").then((data) => {
    documents.value = data.items;
    docpath.value = data.pathToRoot.reverse();
    const newURL = window.location.origin + window.location.pathname + "?folder=" + id
    window.history.pushState({path: newURL},'',newURL);
  }).catch((err) => {
    error(err);
  });
});

const LoadMore = ref(()=>{
  const page = Math.floor(documents.value.length/50)
  fetch.get(currentId, currentType || "folder",page).then((data) => {
    documents.value = documents.value.concat(data.items);
    docpath.value = data.pathToRoot.reverse();
    const newURL = window.location.origin + window.location.pathname + "?folder=" + id
    window.history.pushState({path: newURL},'',newURL);
  }).catch((err) => {
    error(err);
  });
})

const OpenDocument = ref((id,name) => {
  sharingDocument.value = id;
  documentName = name
});

const ShareDocument = ref(() => {
  // fetch.share(id, type || "folder").then((data) => {
  //   documents.value = data.items;
  //   docpath.value = data.pathToRoot.reverse();
  //   console.log(docpath.value);
  // }).catch((err) => {
  //   error(err);
  // });
  // console.log(shareEmail)
  // if(shareEmail.value.indexOf("@") === -1)return;
  confirm("Downloading document...")
  fetch.share(sharingDocument.value,documentName).then((res)=>{
    // console.log(res)
    confirm("Document successfully downloaded")
    sharingDocument.value = false;
  })
});

const CloseSharing = ref(() => {
  sharingDocument.value = false;
});

let lastWarn = false;
function warn(value) {
  Warn.value = value;
  let time = Date.now();
  lastWarn = time;
  setTimeout((time) => {
    if (lastWarn == time) {
      Warn.value = "";
    }
  }, 2000, time);
}
let lastConfirm;
function confirm(value) {
  Confirm.value = value;
  let time = Date.now();
  lastConfirm = time;
  setTimeout((time) => {
    if (lastConfirm == time) {
      Confirm.value = "";
    }
  }, 2000, time);
}

// const RenderPart = ref((id) => {
// 
// fetch.get(id, type || "document").then((data) => {

// }).catch((err) => {
//   error(err);
// });
// });



const join = ref((...args) => {
  return args.join("");
});

function error() {

}

init();

export {
  documents,
  IndexFolder,
  docpath,
  baseURL,
  join,
  sharingDocument,
  CloseSharing,
  OpenDocument,
  ShareDocument,
  // shareEmail,
  Warn,
  Confirm,
  LoadMore
};
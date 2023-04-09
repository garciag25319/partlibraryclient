import { Fetch } from './fetchdoc.js';
import { ref } from 'vue';
import { fetchdata } from "./fetch-options.js";

const fetch = new Fetch(fetchdata);

const documents = ref([]);
const docpath = ref([]);
const baseURL = ref(fetchdata.baseURL);
const sharingDocument = ref(false);
const shareEmail = ref("");
const Warn = ref("");
const Confirm = ref("");

let documentName = ""

function init() {
  IndexFolder.value();
}

const IndexFolder = ref((id, type) => {
  fetch.get(id, type || "folder").then((data) => {
    documents.value = data.items;
    docpath.value = data.pathToRoot.reverse();
    console.log(docpath.value);
  }).catch((err) => {
    error(err);
  });
});

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
  console.log(shareEmail)
  // if(shareEmail.value.indexOf("@") === -1)return;
  confirm("Downloading document...")
  fetch.share(sharingDocument.value,documentName).then((res)=>{
    console.log(res)
    confirm("Document successfully shared with " + shareEmail)
    // sharingDocument.value = false;
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
  console.log(args);
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
  shareEmail,
  Warn,
  Confirm
};
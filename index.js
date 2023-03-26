import { Fetch } from './fetchdoc.js';
import { ref } from 'vue';
import { fetchdata } from "./fetch-options.js";

const fetch = new Fetch(fetchdata);

const documents = ref([]);
const docpath = ref([])

function init() {
  IndexFolder.value();
}

const IndexFolder = ref((id,type) => {
  fetch.get(id,type || "folder").then((data) => {
    documents.value = data.items;
    docpath.value = data.pathToRoot.reverse()
    console.log(docpath.value)
  }).catch((err) => {
    error(err);
  });
});

const RenderPart = ref((id)=> {
  fetch.get(id,type || "document").then((data) => {
    
  }).catch((err) => {
    error(err);
  });
})

function error() {

}

init()

export {
  documents,
  IndexFolder,
  docpath
};
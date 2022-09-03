const express = require("express");
const fs = require("fs");
const {getAvailableFiles,VALID_PARTICIPANTS,wsServer,RES_HEAD_OBJ,upload,} = require("./model/server_model");
const {sendHomeHTMLFile,sendJSFile,sendFileList,broadcastMessage} = require("./controller/server_controller");
const ws_server = wsServer;
const app = express();


//**START------> CODE USED TO CONDUCT UNIT TEST
function unitTest(testLabel,istrue){
  if(istrue()){
      console.log(testLabel+" successful")
  }
  if(!istrue()){
      console.log(testLabel+" fail")
  }
}
//****END------> CODE USED TO CONDUCT UNIT TEST



//START------>UNIT TESTING 

/*(1)*/unitTest("unit test for function: sendHomeHTMLFile()",()=>{
  return  sendHomeHTMLFile (null,null)
}) 

/*(2)*/unitTest("unit test for function: sendJSFile()",()=>{
  return  sendJSFile(null,null,"./controller/client_controller.js")
})

/*(3)*/unitTest("test VALID_PARTICIPANTS data correct ",()=>{
  return  (JSON.parse(fs.readFileSync("./model/participant_list.json", {encoding: "utf8",flag: "r",}))["1234"]==VALID_PARTICIPANTS["1234"])
}) 

/*(4)*/unitTest("test VALID_PARTICIPANTS data wrong ",()=>{
  return  (JSON.parse(fs.readFileSync("./model/participant_list.json", {encoding: "utf8",flag: "r",}))["1234"]==VALID_PARTICIPANTS["a1234"])
}) 



/*(5)*/unitTest("test sendFileList() ",()=>{
  if(sendFileList(null,null,"cse423.09_projection.ppt.pdf")){
    return true
  }
})


/*(6)*/unitTest("test getAvailableFiles() ",()=>{
  if(getAvailableFiles){
    return true
  }
})  
//END------>UNIT TESTING
































app.post("/uploadForm", upload.fields([{name: "fileData",maxCount: 5,},]),(req, res, next) => {sendHomeHTMLFile(req, res, next);});
ws_server.on("connection", (ws) => {
 broadcastMessage (ws,ws_server,VALID_PARTICIPANTS);
});
ws_server.on("close", () => {
  clients.delete(ws);
});
app.get("/", (req, res) => {
sendHomeHTMLFile(req, res)
});
app.get("/model/client_model.js", (req, res) => {
  sendJSFile(req, res, "./model/client_model.js");
});
app.get("/view/client_view.js", (req, res) => {
  sendJSFile(req, res, "./view/client_view.js");
});
app.get("/controller/client_controller.js", (req, res) => {
  sendJSFile(req, res, "./controller/client_controller.js");
});
app.get("/seeAvailableFiles", (req, res) => {
  res.writeHead(200, RES_HEAD_OBJ);
  res.end(JSON.stringify(getAvailableFiles()));
});
app.get("/fileUpload/*", (req, res) => {
  sendFileList(req, res)
});
app.listen(3000, () => {
});



function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      showAvailableFiles(this.responseText);
    }
  };
  xhttp.open("GET", "http://localhost:3000/seeAvailableFiles", true);
  xhttp.send();
}

function handleSendText(){
  
  var password = document.getElementById("pString").innerText;
  var message = document.getElementById("textAreaInput").value;
  password += "_" + message;
  try{
    socket.send(password);
  }catch{}
  emptyTextArea();
  if(password){
    return true
  }else{
    return false
  }
}

document.getElementById("sendText").onclick = () => {
  handleSendText()
 
};

socket.onmessage = ({ data }) => {
  appendNewMessage(data);
};

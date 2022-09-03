function unitTest(testLabel,istrue){
    if(istrue()){
        console.log(testLabel+" successful")
    }
    if(!istrue()){
        console.log(testLabel+" fail")
    }
}

// run unit test for  handleSendText()
unitTest("unit test  handleSendText()",()=>{
    return handleSendText()
})


// run unit test for handlePasswordButton()
unitTest("unit test  handlePasswordButton()",()=>{
    return handlePasswordButton()
})


//run unit test for emptyTextArea()
unitTest("unit test emptyTextArea()",()=>{
    emptyTextArea()
    return (document.getElementById("textAreaInput").value=="")
})

//run unit test for appendNewMessage(data)
unitTest("unit test appendNewMessage(data)",()=>{
    appendNewMessage("test data")
    return (document.getElementById("textAreaInput").value=="")
})


//run unit test for  getStyle()
unitTest("unit test getStyle()",()=>{
   var a =  getStyle()
   var b =  getStyle()
    return (a!=b)
})
// google 的App script
//用來接收前端的的資料，寫到雲端sheet檔案，小應用

function doPost(e) {
  var params = e.parameter;
  var time = params.time;
  var name = params.name,
      gender = params.gender,
      email = params.email,
      message = params.message;
    
  var SpreadSheet = SpreadsheetApp.openById("試算表ID"); //試算表ID
  var Sheet = SpreadSheet.getSheets()[0]; //第一個表單
  var LastRow = Sheet.getLastRow(); //取得有資料的最後一行的"行數"
  
  console.log(time);

  //寫入資料 (行,欄)
  if (time !== undefined) { //防止api被搗蛋
    Sheet.getRange(LastRow + 1, 1).setValue(time);
    Sheet.getRange(LastRow + 1, 2).setValue(name);
    Sheet.getRange(LastRow + 1, 3).setValue(gender);
    Sheet.getRange(LastRow + 1, 4).setValue(email);
    Sheet.getRange(LastRow + 1, 5).setValue(message);
  }else
  {
    return ContentService.createTextOutput(JSON.stringify({ result: '失敗', message:message })).setMimeType(ContentService.MimeType.JSON); 
  }
  return ContentService.createTextOutput(JSON.stringify({ result: '成功', version: '1.0' })).setMimeType(ContentService.MimeType.JSON); 
}

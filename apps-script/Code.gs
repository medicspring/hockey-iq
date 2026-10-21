// Google Apps Script: receives quiz submissions and writes them to this spreadsheet.
// One tab per quiz; one row per player; green = correct, red = incorrect.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (d.type === 'suggestion') {   // Coach Admin Portal ideas go to their own tab
      const s = ss.getSheetByName('Suggestions') || ss.insertSheet('Suggestions');
      if (s.getLastRow() === 0) {
        s.appendRow(['Submitted', 'Status', 'Name', 'Email', 'Level', 'Skill to teach', 'Drill / situation description']);
        s.getRange(1, 1, 1, 7).setFontWeight('bold'); s.setFrozenRows(1);
        s.setColumnWidth(6, 220); s.setColumnWidth(7, 520);
      }
      s.appendRow([new Date(d.submitted), 'New', d.name || '', d.email || '', d.level || '', d.skill || '', d.description || '']);
      s.getRange(s.getLastRow(), 7).setWrap(true);
      return ContentService.createTextOutput('ok');
    }
    const tab = String(d.quizTitle || 'Quiz').replace(/[\[\]*?:\/\\]/g, '').substring(0, 90);
    const sh = ss.getSheetByName(tab) || ss.insertSheet(tab);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Submitted', 'Name', 'Score', 'Out of'].concat(d.answers.map((a, i) => 'Q' + (i + 1) + ': ' + a.question)));
      sh.appendRow(['', 'Correct answer', '', ''].concat(d.answers.map(a => a.correct)));
      sh.getRange(1, 1, 2, sh.getMaxColumns()).setFontWeight('bold').setWrap(true);
      sh.setFrozenRows(2);
    }
    const row = [new Date(d.submitted), d.name, d.score, d.total].concat(d.answers.map(a => a.chosen));
    sh.appendRow(row);
    const r = sh.getLastRow();
    d.answers.forEach((a, i) => sh.getRange(r, 5 + i).setBackground(a.isCorrect ? '#d9f2e3' : '#f8d7d7'));
    return ContentService.createTextOutput('ok');
  } finally { lock.releaseLock(); }
}
function doGet() { return ContentService.createTextOutput('Hockey quiz endpoint is running.'); }

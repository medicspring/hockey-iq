# Hockey IQ Quiz (GitHub Pages + Google Sheets)

Players open your link, type their name, answer the questions and press Submit. Their answers land in your Google Sheet (you can download it as Excel any time: File > Download > Microsoft Excel).

## Files
| File | What it does |
|---|---|
| `index.html` | The quiz players use. Reads `quiz.json`. |
| `quiz.json` | The quiz that is live right now (title, questions, sheet link). |
| `question-bank.json` | Every question ever written (Q001, Q002, ...). |
| `builder.html` | Pick questions from the bank and download a new `quiz.json`. |
| `apps-script/Code.gs` | Script that writes submissions into your Google Sheet. |

## One-time setup
1. **Google Sheet:** create a new sheet. Open **Extensions > Apps Script**, delete the sample code, paste in `apps-script/Code.gs`, and save.
2. **Deploy:** click **Deploy > New deployment > Web app**. Set *Execute as:* **Me** and *Who has access:* **Anyone**. Click Deploy, approve the permissions, and copy the **Web app URL** (ends in `/exec`).
3. **GitHub:** create a repository, upload all these files, then go to **Settings > Pages**, choose branch `main` and folder `/ (root)`. Your link will be `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. **Connect:** open `https://YOUR-USERNAME.github.io/REPO-NAME/builder.html`, paste the Web app URL, choose your questions, click **Download quiz.json**, and upload it to the repo (replace the old one). Email the main link to your team.

Each quiz gets its own tab in the sheet: one row per player, green cells for right answers and red for wrong ones, with the correct answers in row 2.

## Changing the quiz later
Open `builder.html`, click **Load current quiz.json**, tick or untick questions, download `quiz.json`, and upload it to GitHub. Changes appear within a minute or two.

## Adding questions
Send new questions to Claude along with your current `question-bank.json`. It returns an updated file; upload it to the repo.

## Notes
- The quiz file contains the correct answers (needed for scoring), so a determined player could find them in the page source.
- Anyone with your Web app URL can post to the sheet. Do not share the URL publicly beyond the repo.
- If you change the Apps Script code, use **Deploy > Manage deployments > Edit > New version** so the same URL keeps working.

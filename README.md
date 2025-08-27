# ForgeVoice Dashboard Starter (No-Code-Friendly)

This is a **super simple Next.js starter** that reads your **Airtable Episodes** and shows them on a **Dashboard**.
No login yet (to keep it easy). You can add auth later.

---

## 1) Make your Airtable

Create base `FVS_Dashboard` with table **`Episodes`** and fields:
- `EpisodeID` (Primary, text e.g. EP-0001)
- `ClientID` (text e.g. CL-0001)
- `Title` (text)
- `Status` (single select: Intake, Editing, Design, Distribution, Review, Scheduled, Published, Blocked)
- `DueDate` (date)
- `YouTubeURL` (url)
- `UpdatedAt` (last modified time)

Add a few sample rows.

Create an **Airtable Personal Access Token** and note your **Base ID**.

---

## 2) Deploy on Vercel (free)

1. Create a new GitHub repo (web UI is fine).
2. Upload the files from this folder to the repo (drag & drop).
3. Go to **Vercel** → New Project → Import your repo.
4. In **Project Settings → Environment Variables**, add:

```
AIRTABLE_PAT=pat_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxx
AIRTABLE_TABLE_EPISODES=Episodes
NEXT_PUBLIC_DEFAULT_CLIENT_ID=CL-0001
```

5. Click **Deploy**.

---

## 3) Open the site

- Visit `/dashboard` and you should see your Episodes.
- Change the **Client ID** box to another value to filter different clients.

> The page refreshes every 15 seconds so it feels live.

---

## 4) Next steps (when ready)

- Add **Auth (Clerk)** so only logged-in users can view.
- Add a **PATCH** API to update `Status` from the UI.
- Add more pages: **Kanban**, **KPIs**, **Calendar**, **Activity**.
- Replace polling with **Airtable webhooks → push updates** (optional).

If you get stuck anywhere, ask me and I’ll coach you through it.

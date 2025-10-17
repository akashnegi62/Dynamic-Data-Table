Dynamic Data Table Manager

A Dynamic, client-side data table built with Next.js 14, Redux Toolkit, and Material UI.
Supports search, sorting, pagination, column management, CSV import/export, and is fully responsive.

Features

✅ Dynamic Table

Default columns: Name, Email, Age, Role

Clickable headers for ASC/DESC sorting

Client-side pagination (10 rows per page)

✅ Global Search

Instant filtering across all columns

Resets to first page on search term change

✅ Column Management

Show/hide existing columns via checkboxes

Add new fields dynamically

Persist visibility/order locally

✅ CSV Import/Export

Import CSV with dynamic columns (PapaParse)

Basic validation

Export current view including only visible columns

✅ Responsive UI

Stacked toolbar on small screens

Horizontal scroll on narrow viewports

Consistent control heights on larger screens

Light/dark theme toggle

Tech Stack

Next.js 14 (App Router)

React 18 + TypeScript

Redux Toolkit + React-Redux

Material UI v5

React Hook Form

PapaParse for CSV parsing

FileSaver/Blob for CSV export

Getting Started
1. Create the project
npx create-next-app@latest dynamic-table
cd dynamic-table

2. Install dependencies
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled react-hook-form papaparse file-saver

3. Add project structure

Create the following directories:

app/
components/
features/
lib/


Add the provided code for pages, providers, store, slices, components, and helpers.

4. Run the project
npm run dev


Open http://localhost:3000
 to view the app.

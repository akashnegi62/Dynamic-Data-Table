Dynamic Data Table Manager
A Next.js 14 + Redux Toolkit + MUI application that renders a dynamic, client-side data table with global search, sorting, pagination, column show/hide with persistence, CSV import/export, and responsive layout for mobile/tablet/desktop.​

Features
Table with default columns: Name, Email, Age, Role, including ASC/DESC sort on clickable headers and client-side pagination (10 rows/page).​

Global search across all fields with instant filtering and page reset on term changes.​

Manage Columns dialog to show/hide existing columns via checkboxes, add new fields, and persist visibility/order locally.​

CSV import (PapaParse) with basic validation and header-driven dynamic columns; CSV export of current view including only visible columns.​

Responsive UI: stacked toolbar on small screens, horizontal scroll for the table on narrow viewports, consistent control heights on laptops, and theme toggle (light/dark).​

Tech stack
Next.js 14 (App Router), React 18, TypeScript.​

Redux Toolkit + React-Redux for state management and derived selectors.​

Material UI v5 for components, theming, and responsive utilities.​

React Hook Form for dialog forms (add field).​

PapaParse for CSV parsing; FileSaver/Blob for CSV export.​

Getting started
Create and install

npx create-next-app@latest dynamic-table --ts --eslint

cd dynamic-table

npm i @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled react-hook-form papaparse file-saver​

Add project files

Add app/, components/, features/, lib/ as outlined below and paste in the provided code for page, providers, store, slices, components, and helpers.​

Run

npm run dev

Open http://localhost:3000

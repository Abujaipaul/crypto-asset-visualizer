# Crypto Asset Visualizer

A professional-grade, dark-mode financial dashboard built with React and Recharts. This application fetches 30-day historical time-series data, processes raw API payloads, and renders an interactive data visualization mimicking enterprise trading terminals.

## Technical Architecture & Features

* **Time-Series Data Pipeline:** Utilizes asynchronous `fetch` requests to pull over 700+ hourly historical data points from the CoinGecko API.
* **Manual Data Engineering:** Implements JavaScript `.map()` functions to transform complex nested arrays into clean arrays of objects. Features custom logic to translate machine-readable Unix timestamps into formatted, human-readable date strings.
* **Interactive SVG Charting:** Integrates the `recharts` library to build a responsive `<AreaChart>`. Features dynamic Y-axis domains (min/max boundaries) to highlight market volatility and custom hover `<Tooltip>` states for precise data inspection.
* **Enterprise UI/UX:** Styled completely from scratch using Vanilla CSS to match the dark-mode aesthetic of professional Fintech tools (e.g., Bloomberg Terminals), including glowing vector graphics and custom responsive card containers.

## Tech Stack

* **Frontend Framework:** React (Vite)
* **Data Visualization:** Recharts
* **Styling:** Pure Vanilla CSS (CSS Flexbox/Grid)
* **Data Source:** CoinGecko API (v3)


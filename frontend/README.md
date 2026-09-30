# 🚀 DSA Tracker

**DSA Tracker** is a modern, highly interactive web application built to help students, developers, and educators visualize exactly how Data Structures and Algorithms work under the hood. 

Instead of relying on static code, DSA Tracker provides fully animated, step-by-step walkthroughs of fundamental concepts—displaying memory states, variable changes, highlighted code execution, and performance statistics in real-time.

---

## ✨ Key Features

### 🧩 Data Structure Visualizations
Interactive memory-cell and node-based visualizations equipped with a **real-time scrolling action log** that details exact memory shifts and pointer adjustments step-by-step.
- **Arrays**: Fixed-capacity array visualization. Supports animated Insertion (with right-shifts), Deletion (with left-shifts), Updates, and Linear Search.
- **Singly Linked Lists**: Node and pointer (`➔`) visualizations. Supports animated pointer traversal, Head/Tail/Index Insertions, Deletions, Updates, and Search.

### 📈 Algorithm Visualizations
Bar-chart based visualizations for searching and sorting arrays with full playback controls.
- **Searching Algorithms**: Linear Search, Binary Search
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Playback Controls**: Play, Pause, Next Step, Previous Step, Reset, and Animation Speed slider.
- **Multi-Language Code Tracking**: Synchronized, line-by-line code highlighting in **Java**, **C++**, and **Pseudocode** corresponding to the exact current animation step.
- **Live Analytics**: Monitors time & space complexity, array size, active comparisons, and swap counters on the fly.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Keyframe Animations)
- **Deployment**: Ready for Vercel, Netlify, or standard static hosting.

---

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── algorithms/          # Core algorithmic logic and step-generators
│   │   ├── searching/       # Binary & Linear search implementations
│   │   └── sorting/         # Bubble, Insertion, Merge, Quick, Selection sorts
│   ├── components/          # Reusable UI components
│   │   ├── AlgorithmSelector.jsx
│   │   ├── ArrayBars.jsx
│   │   ├── CodeViewer.jsx
│   │   ├── Controls.jsx
│   │   ├── Navbar.jsx
│   │   └── Visualizer.jsx
│   ├── hooks/               # Custom React hooks (e.g., useVisualizer)
│   ├── pages/               # Routed pages
│   │   ├── About.jsx
│   │   ├── ArrayPage.jsx
│   │   ├── Home.jsx
│   │   └── LinkedListPage.jsx
│   ├── App.jsx              # Application router
│   └── main.jsx             # React entry point
└── package.json
```

---

## 🚀 Getting Started

Follow these steps to run the DSA Tracker locally on your machine.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` to interact with the application!

### 4. Build for Production
To create a production-optimized build:
```bash
npm run build
```

---

## 🤝 Contributing
Contributions are always welcome! Whether it's adding a new algorithm (e.g., Dijkstra's, BFS/DFS), a new data structure (Trees, Graphs, Hash Maps), or improving the UI. 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Built with ❤️ for algorithm learners everywhere.*

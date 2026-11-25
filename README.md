# Shivam Web Designs

Independent digital design and engineering studio. We build bespoke digital flagships, web applications, and precision-tuned design systems.

## Project Structure

All website source files reside strictly in the [`website/`](./website) directory:

```
Shivam Web Designs/
├── website/
│   ├── index.html       # Semantic HTML5 architecture & accessible landmarks
│   ├── styles.css       # Modern CSS Grid, Container Queries, light-dark() tokens
│   ├── script.js        # Minimal, dependency-free interactions
│   └── Brand Logo.PNG   # Studio brand identity asset
└── README.md
```

## Running the Website Locally

From the repository root:

```bash
# Serve directly from the website directory:
python3 -m http.server -d website 8000
```

Then navigate to `http://localhost:8000/`.

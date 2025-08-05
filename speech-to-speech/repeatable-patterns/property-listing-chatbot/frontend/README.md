# Property Listing Chatbot Frontend

The frontend is a lightweight chat interface that talks to the backend REST
API. It renders conversation bubbles, supports microphone input, and plays back
audio responses from Nova Sonic.

## Local development

1. Start the backend service following the instructions in
   `../backend/README.md`. By default it runs on `http://localhost:8000`.
2. Serve the static files:
   ```bash
   cd frontend
   python -m http.server 8001
   ```
3. Open [http://localhost:8001](http://localhost:8001) in a browser. Enter a
   question or use the microphone button to speak.

The `API_URL` constant at the top of `app.js` controls where requests are sent.
Change it to point at your deployed backend.

## Deploying on AWS

1. **Upload to S3** – Build the static site (this directory) and upload its
   contents to an S3 bucket configured for static website hosting.
2. **Distribute with CloudFront** – Create a CloudFront distribution pointing to
   the S3 bucket for global, cached delivery.
3. **Connect to backend** – Update `API_URL` in `app.js` to the public endpoint
   of your backend (for example an Application Load Balancer in front of ECS).

Once deployed, multiple users can access the site concurrently through
CloudFront while the backend scales independently.
